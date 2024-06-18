import { Router } from "express";
import { deleteCourse, listCourse, saveCourse } from "./controllers/course";
import { listStudent, saveStudent, deleteStudent } from "./controllers/student";
import { listBook, saveBook, deleteBook } from "./controllers/book";
import { listSchool, saveSchool, deleteSchool } from "./controllers/school";
import { listLaptop, saveLaptop, deleteLaptop } from "./controllers/laptop";
import { listMonitor, saveMonitor, deleteMonitor } from "./controllers/monitor";
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

router.get("/schools", listSchool);
router.post("/schools", saveSchool)
router.delete("/schools/:id", deleteSchool);

router.get("/laptops", listLaptop);
router.post("/laptops", saveLaptop)
router.delete("/laptops/:id", deleteLaptop);

router.get("/monitor", listMonitor);
router.post("/monitor", saveMonitor)
router.delete("/monitor/:id", deleteMonitor);

export { router };
