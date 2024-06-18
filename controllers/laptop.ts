import { pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function listLaptop(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  //realiza consulta sql
  try {
    const laptops = await client.query(`select * from laptops`)
    //retorna consulta em formato json
    return res.status(200).json(laptops.rows);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error });
  } finally {
    client.release;
  }
}
export async function saveLaptop(req: Request, res: Response) {
  const laptop = req.body;
  //verifica o erro
  console.log(laptop)
  //conecta com o banco
  const client = await pool.connect();
  try {
    //realiza consulta sql
    const response = await client.query(`INSERT INTO laptops (model, description) VALUES ('${laptop.title}','${laptop.description}')`)
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error });
  } finally {
    client.release();
  }
}

export async function deleteLaptop(req: Request, res: Response){
  const client = await pool.connect();
  const id = req.params.id
 try{ 
  const response = await client.query(`delete from laptops where id=${id}`);
  res.status(200).json({message: "Registro Excluido"});
}catch (error){ 
res.status(400).json({message: "Erro na Exclusão", error});
}finally{ 
  client.release()
}
}

