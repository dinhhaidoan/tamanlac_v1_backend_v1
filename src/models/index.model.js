const mongoose = require('mongoose');

// --- NHÓM DUDDHIST SCRIPTURE (KINH ĐIỂN PHẬT GIÁO) ---
const Category = require('./duddhist_scriptures/category.model');
const Work = require('./duddhist_scriptures/work.model');
const Division = require('./duddhist_scriptures/division.model');
const Segment = require('./duddhist_scriptures/segment.model');

// --- NHÓM CONTENT (NỘI DUNG) ---
const Author = require('./content/author.model');
const SegmentContent = require('./content/segment_content.model');
const Dictionary = require('./content/dictionary.model');

// --- NHÓM FEATURE (TIỆN ÍCH) ---
const Media = require('./feature/media.model');
const Calendar = require('./feature/calendar.model');

// --- NHÓM USER (NGƯỜI DÙNG) ---
const Account = require('./user/account.model');
const History = require('./user/history.model');
const Bookmark = require('./user/bookmark.model');
const Contemplation = require('./user/contemplation.model');
const Practice = require('./user/practice.model');

// Export object chứa tất cả models
module.exports = {
    // DUDDHIST SCRIPTURE
    Category, Work, Division, Segment,
    // Content
    Author, SegmentContent, Dictionary,
    // Feature
    Media, Calendar,
    // User
    Account, History, Bookmark, Contemplation, Practice
};