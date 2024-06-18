import { Router } from "express";
import { deleteCourse, listCourse, saveCourse } from "./controllers/course";
import { listStudent, saveStudent, deleteStudent } from "./controllers/student";
import { listBook, saveBook, deleteBook } from "./controllers/book";
const router = Router();

router.get("/courses", listCourse);
router.post("/courses", saveCourse);
router.delete("/courses/:id", deleteCourse);

router.get("/students", listStudent);
router.post("/students", saveStudent)
router.delete("/students/:id", deleteStudent);

router.get("/books", listBook);
router.post("/books", saveBook)
router.delete("/books/:id", deleteBook);

export { router };
