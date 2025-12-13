// src/helpers/importer.js
const { Work, Division, Segment, SegmentContent, Dictionary } = require('../models');

// 1. Hàm quét và gắn link từ điển (Auto-linker)
async function processTextWithGlossary(rawText) {
    // Lấy toàn bộ từ khóa, cache lại vào RAM (vì DB từ điển nhỏ, < 5MB)
    // Sắp xếp từ dài -> ngắn để match chính xác nhất
    const terms = await Dictionary.find().select('term').lean();
    const sortedTerms = terms.sort((a, b) => b.term.length - a.term.length);

    let processed = rawText;
    
    // Loop qua từng từ khóa
    for (const item of sortedTerms) {
        // Regex: \b là biên từ, 'gi' là global + case-insensitive
        // Lưu ý: Tiếng Việt regex \b hơi phức tạp, đây là bản đơn giản
        const regex = new RegExp(`(${item.term})`, 'gi');
        
        // Chỉ replace nếu chưa được replace (tránh lồng thẻ <gl><gl>...)
        // Logic thực tế cần phức tạp hơn chút để check thẻ HTML, 
        // nhưng ở mức cơ bản thì replace trực tiếp:
        processed = processed.replace(regex, `<gl term="$1">$1</gl>`);
    }
    
    return processed;
}

// 2. Hàm nhập liệu chính
async function importSutraFromFile(title, authorId, rawContent) {
    // Tạo Bộ Kinh
    const work = await Work.create({ title, authors: [authorId] });
    
    // Tách Chương (Giả sử chương bắt đầu bằng ##)
    const chapters = rawContent.split('##'); 
    
    let segmentOrderGlobal = 1;

    for (const chapterText of chapters) {
        if (!chapterText.trim()) continue;

        // Lấy tên chương (dòng đầu)
        const lines = chapterText.trim().split('\n');
        const chapterTitle = lines[0].trim();
        const verses = lines.slice(1); // Các dòng còn lại là kinh

        // Tạo Chương
        const division = await Division.create({
            work: work._id,
            title: chapterTitle,
            order: segmentOrderGlobal // Hoặc logic order riêng theo chương
        });

        // Loop từng câu
        let verseOrder = 1;
        for (const verse of verses) {
            if (!verse.trim()) continue;

            // TẠO XƯƠNG (Segment)
            const segment = await Segment.create({
                division: division._id,
                work: work._id,
                order: verseOrder++
            });

            // XỬ LÝ THỊT (Auto Link Glossary)
            const linkedContent = await processTextWithGlossary(verse.trim());

            // TẠO THỊT (SegmentContent)
            await SegmentContent.create({
                segment: segment._id,
                language: 'vi', // Mặc định tiếng Việt
                author: authorId,
                content: linkedContent, // Đã có thẻ <gl>ngũ uẩn</gl>
                plain_text: verse.trim() // Để search
            });
        }
    }
    console.log(`Đã nhập xong bộ kinh: ${title}`);
}