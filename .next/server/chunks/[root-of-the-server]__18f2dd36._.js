module.exports = {

"[project]/.next-internal/server/app/api/books/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/fs/promises [external] (fs/promises, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[project]/src/lib/books.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createBook": (()=>createBook),
    "deleteBook": (()=>deleteBook),
    "getBookById": (()=>getBookById),
    "getBooks": (()=>getBooks),
    "updateBook": (()=>updateBook)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const BOOKS_FILE_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'books.json');
async function getBooks() {
    try {
        const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(BOOKS_FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading books file:', error);
        // If file doesn't exist, return empty array
        if (error.code === 'ENOENT') {
            return [];
        }
        throw new Error('Failed to read books data');
    }
}
async function getBookById(id) {
    try {
        const books = await getBooks();
        return books.find((book)=>book.id === id) || null;
    } catch (error) {
        console.error('Error getting book by ID:', error);
        return null;
    }
}
async function createBook(bookData) {
    try {
        const books = await getBooks();
        const newBook = {
            ...bookData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        books.push(newBook);
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(BOOKS_FILE_PATH, JSON.stringify(books, null, 2));
        return newBook;
    } catch (error) {
        console.error('Error creating book:', error);
        throw new Error('Failed to create book');
    }
}
async function updateBook(id, updatedData) {
    try {
        const books = await getBooks();
        const bookIndex = books.findIndex((book)=>book.id === id);
        if (bookIndex === -1) {
            return null;
        }
        books[bookIndex] = {
            ...books[bookIndex],
            ...updatedData,
            updatedAt: new Date().toISOString()
        };
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(BOOKS_FILE_PATH, JSON.stringify(books, null, 2));
        return books[bookIndex];
    } catch (error) {
        console.error('Error updating book:', error);
        throw new Error('Failed to update book');
    }
}
async function deleteBook(id) {
    try {
        const books = await getBooks();
        const bookIndex = books.findIndex((book)=>book.id === id);
        if (bookIndex === -1) {
            return false;
        }
        books.splice(bookIndex, 1);
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(BOOKS_FILE_PATH, JSON.stringify(books, null, 2));
        return true;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw new Error('Failed to delete book');
    }
}
}}),
"[project]/src/app/api/books/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$books$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/books.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const books = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$books$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBooks"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch books'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        // Validate required fields
        const requiredFields = [
            'title',
            'author',
            'isbn',
            'publicationDate',
            'genre',
            'description'
        ];
        const missingFields = requiredFields.filter((field)=>!body[field]);
        if (missingFields.length > 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Missing required fields: ${missingFields.join(', ')}`
            }, {
                status: 400
            });
        }
        const bookData = {
            title: body.title,
            author: body.author,
            isbn: body.isbn,
            publicationDate: body.publicationDate,
            genre: body.genre,
            description: body.description,
            coverImageUrl: body.coverImageUrl || '',
            readingStatus: body.readingStatus || 'unread',
            rating: body.rating || undefined,
            review: body.review || undefined
        };
        const newBook = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$books$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createBook"])(bookData);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newBook, {
            status: 201
        });
    } catch (error) {
        console.error('Error creating book:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to create book'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__18f2dd36._.js.map