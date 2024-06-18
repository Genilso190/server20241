import { pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function listSchool(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  //realiza consulta sql
  try {
    const schools = await client.query(`select * from schools`)
    //retorna consulta em formato json
    return res.status(200).json(schools.rows);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error });
  } finally {
    client.release;
  }
}
export async function saveSchool(req: Request, res: Response) {
  const school = req.body;
  //verifica o erro
  console.log(school)
  //conecta com o banco
  const client = await pool.connect();
  try {
    //realiza consulta sql
    const response = await client.query(`INSERT INTO schools (name) VALUES ('${school.name}')`)
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error });
  } finally {
    client.release();
  }
}

export async function deleteSchool(req: Request, res: Response){
  const client = await pool.connect();
  const id = req.params.id
 try{ 
  const response = await client.query(`delete from schools where id=${id}`);
  res.status(200).json({message: "Registro Excliido"});
}catch (error){ 
res.status(400).json({message: "Erro na Exclusão", error});
}finally{ 
  client.release()
}
}

