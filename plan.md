```markdown
# Detailed Implementation Plan for Full-Stack Book Management Website

This plan outlines the creation of a full-stack book management website with JSON-based storage for book data, using Next.js (App Router) with TypeScript, Tailwind CSS, and shadcn/ui components. The site will offer CRUD operations, search/filtering, and dedicated pages for listing, viewing, adding, and editing books.

---

## 1. Data Storage and Utility Functions

### a. Create JSON Database File
- **File:** `data/books.json`
  - **Content:** Initialize with an empty array:  
    ```json
    []
    ```
  - **Purpose:** Acts as a simple file-based database.  
  - **Error Handling:** Ensure file-read/write errors are caught in subsequent operations.

### b. Create Book Data Utility Functions
- **File:** `src/lib/books.ts`
  - **Functions to implement:**
    - `getBooks()`: Read and parse the JSON file.
    - `getBookById(id: string)`: Find a book by its unique ID.
    - `createBook(bookData: Book)`: Append a new book; generate a unique ID (using `Date.now().toString()` or similar).
    - `updateBook(id: string, updatedData: Partial<Book>)`: Merge changes and rewrite the file.
    - `deleteBook(id: string)`: Remove the book from the array and update the file.
  - **Error Handling:** Use `try...catch` blocks; return proper error messages or null values.
  - **Best Practices:** Use Node’s `fs/promises` for asynchronous file handling, and manage file paths with `path.join(process.cwd(), 'data', 'books.json')`.

---

## 2. API Endpoints

### a. Books Collection Endpoint
- **File:** `src/app/api/books/route.ts`
  - **Methods:**
    - **GET:**  
      - Retrieve the list of all books using `getBooks()`.
      - Return HTTP status 200 with JSON array.
    - **POST:**  
      - Accept a JSON payload with fields: `title`, `author`, `isbn`, `publicationDate`, `genre`, `description`, `coverImageUrl`, and optional fields for reading status and ratings.
      - Validate required fields and call `createBook(bookData)`.
      - Return HTTP status 201 with the created book object.
  - **Error Handling:** Validate request body and catch file operation errors, returning HTTP 400 or 500 as needed.

### b. Individual Book Endpoint
- **File:** `src/app/api/books/[id]/route.ts`
  - **Methods:**
    - **GET:**  
      - Call `getBookById(id)` to fetch a single book.
      - Respond with HTTP 200 or 404 if not found.
    - **PATCH/PUT:**  
      - Update book data using `updateBook(id, updatedData)`.
      - Validate updates and return the updated book with HTTP 200.
    - **DELETE:**  
      - Remove the book using `deleteBook(id)`.
      - Return HTTP 200 on success, or 404 if not found.
  - **Error Handling:** Ensure proper HTTP error codes and messages for missing or invalid IDs.

---

## 3. UI Pages

### a. Books Listing Page (List/Search)
- **File:** `src/app/books/page.tsx`
  - **Features:**
    - Fetch all books from the `/api/books` endpoint (client-side or server-side rendering).
    - Display books using a newly created `BookCard` component.
    - Include a search input to filter books by title, author, or genre.
    - Use responsive layout and modern styling with Tailwind CSS.
  - **Error Handling:** Display user-friendly error messages if the data fails to load.

### b. Book Details Page
- **File:** `src/app/books/[id]/page.tsx`
  - **Features:**
    - Show full details of a selected book (title, author, ISBN, publication date, genre, description, cover image, and any ratings/reviews).
    - Provide action buttons for editing (navigates to Edit page) and deleting the book.
    - Use modern card layouts and clear typography.
  - **Error Handling:** Show "Book not found" message if an invalid ID is supplied.

### c. Book Creation Page
- **File:** `src/app/books/add/page.tsx`
  - **Features:**
    - Render the `BookForm` component in “create mode.”
    - Include fields for each required book detail.
    - Validate inputs on the client side before submission.
    - On form submission, make a POST request to `/api/books` and navigate to the list or detail page on success.
  - **Error Handling:** Display inline validation errors and server error messages.

### d. Book Edit Page
- **File:** `src/app/books/[id]/edit/page.tsx`
  - **Features:**
    - Pre-load the existing book data via `/api/books/[id]` and populate the `BookForm` component.
    - Allow users to update any field and submit the changes with a PATCH request.
    - Confirm updates with a success message.
  - **Error Handling:** Handle failures for invalid IDs or update errors and notify the user.

---

## 4. UI Components

### a. BookCard Component
- **File:** `src/components/BookCard.tsx`
  - **Features:**
    - Display a book's cover image, title, author, genre, and a brief description.
    - Use an `<img>` element for cover images; if `coverImageUrl` is missing, fallback to a placeholder:  
      ```jsx
      <img src="https://placehold.co/400x300?text=Cover+Image+Not+Available" alt="Cover image placeholder showing book cover image not available" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300?text=Default+Cover+Image'; }}/>
      ```
    - Styled with Tailwind CSS for spacing, typography, and responsive design.
  - **Error Handling:** Ensure graceful degradation if image fails to load.

### b. BookForm Component
- **File:** `src/components/BookForm.tsx`
  - **Features:**
    - A reusable form for both adding and editing books.
    - Include input fields for: title, author, ISBN, publication date (date picker), genre (dropdown or input), description (textarea), cover image URL, reading status (radio/select), and rating/reviews.
    - Use shadcn/ui form components (customized for modern look) and Tailwind CSS for styling.
    - Validate input fields and display error states with clear messaging.
    - Handle form submission using client-side fetch calls.
  - **Best Practices:** Use controlled components and proper accessibility labels.

---

## 5. Integration and Testing

### a. Integration Points
- **API to UI:**  
  - The UI pages call API endpoints in `/api/books` for data operations.
  - Use proper loading states and error displays for API interactions.
- **Utility Functions:**  
  - The API endpoints use functions from `src/lib/books.ts` to perform file operations.
- **Routing:**  
  - Use Next.js App Router for navigation among pages: list, details, add, and edit.

### b. Testing and Validation
- **API Testing:**  
  - Use curl commands to test endpoints (GET, POST, PATCH, DELETE):
    ```bash
    # Test: Get all books
    curl -X GET http://localhost:3000/api/books

    # Test: Create a book
    curl -X POST http://localhost:3000/api/books -H "Content-Type: application/json" -d '{"title":"Test Book","author":"Author Name","isbn":"1234567890","publicationDate":"2022-10-10","genre":"Fiction","description":"Test description","coverImageUrl":""}'
    ```
- **UI Testing:**  
  - Verify form validations, error messages, and responsive design.
  - Validate that listing pages update after create, update, or delete operations.

---

## 6. UI/UX Considerations
- **Modern UI:**  
  - Clean, minimalistic design with ample white space, balanced typography, and clear call-to-action buttons.
  - Consistent use of Tailwind CSS spacing, colors, and layout utilities.
  - No external icons or images from icon libraries; use `<img>` tags only when necessary.
- **Accessibility:**  
  - Ensure all forms are labeled and offer keyboard navigability.
  - Provide graceful fallback for images with clear alt text.
- **Mobile Responsive:**  
  - Layout pages using Tailwind responsive classes to ensure usability on various screen sizes.

---

## Summary
- Created a JSON file (`data/books.json`) as a simple datastore and a utility library (`src/lib/books.ts`) for CRUD operations with proper error handling.
- API endpoints under `src/app/api/books` and `src/app/api/books/[id]` handle GET, POST, PATCH, and DELETE methods.
- UI pages for listing, viewing, adding, and editing books are built in the `src/app/books` directory with modern, responsive design.
- Reusable components (`BookCard.tsx` and `BookForm.tsx`) are implemented to manage presentation and interactions.
- The plan emphasizes error handling, client-side validations, and a clean plain typography-based UI without external icon libraries.
```

