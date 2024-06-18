import { pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function listMonitor(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  //realiza consulta sql
  try {
    const monitor = await client.query(`select * from Monitor`)
    //retorna consulta em formato json
    return res.status(200).json(monitor.rows);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error });
  } finally {
    client.release;
  }
}
export async function saveMonitor(req: Request, res: Response) {
  const monitor = req.body;
  //verifica o erro
  console.log(monitor)
  //conecta com o banco
  const client = await pool.connect();
  try {
    //realiza consulta sql
    const response = await client.query(`INSERT INTO monitor (marca) VALUES ('${monitor.marca}')`)
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error });
  } finally {
    client.release();
  }
}

export async function deleteMonitor(req: Request, res: Response){
  const client = await pool.connect();
  const id = req.params.id
 try{ 
  const response = await client.query(`delete from monitor where id=${id}`);
  res.status(200).json({message: "Registro Excliido"});
}catch (error){ 
res.status(400).json({message: "Erro na Exclusão", error});
}finally{ 
  client.release()
}
}

