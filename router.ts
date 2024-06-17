import { Router } from "express";
import { deleteCourse, listCourse, saveCourse } from "./controllers/course";
import { listStudent, saveStudent, deleteStudent } from "./controllers/student";
import { listBoock, saveBoock, deleteBoock } from "./controllers/boock";
const router = Router();

router.get("/courses", listCourse);
router.post("/courses", saveCourse);
router.delete("/courses/:id", deleteCourse);

router.get("/students", listStudent);
router.post("/students", saveStudent)
router.delete("/students/:id", deleteStudent);

router.get("/boocks", listBoock);
router.post("/boocks", saveBoock)
router.delete("/boocks/:id", deleteBoock);

export { router };
