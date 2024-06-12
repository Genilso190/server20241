import { client, pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function deleteStudent(req: Request, res: Response){
  const client = await pool.connect();
  const id = req.params.id
 try{ 
  const response = await client.query('delete fron students where id=${id}');
  res.status(200).json({message: "Registro Excliido"});
}catch (error){ 
res.status(400).json({message: "Erro na Exclusão", error});
}finally{ 
  client.release()
}
}

export async function listStudent(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  try {
    //realiza consulta sql
    const students = await client.query(`select * from students`)
    if (students.rowCount === 0) {
      return res.status(404).json({ messahge: "Não Encontrado" });
    }
    //retorna consulta em formato json

return res.status(200).json(students.rows);
}catch(error){
  console.log(error)
}finally{
  client.release;
}
  }

export async function saveStudent(req: Request, res: Response) {
  const student = req.body;
  //verifica o erro
  console.log(student)
  //conecta com o banco
  const client = await pool.connect();
  try {
    //realiza consulta sql
    const response = await client.query(`INSERT INTO students (name, email) VALUES ('${student.name}','${student.email}')`)
    res.status(201).json(response);
    console.log(response.rows[0]);
    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error });
  } finally {
    client.release();
  }
}



