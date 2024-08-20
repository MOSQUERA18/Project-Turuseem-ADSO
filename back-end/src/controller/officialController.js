import OfficialModel from "../models/officialModel.js";
import { Sequelize, Op } from "sequelize";
import { logger } from "../middleware/logMiddleware.js";

export const getAllFuncionarios = async (req, res) => {
  try {
    const Funcionarios = await OfficialModel.findAll();
    if( Funcionarios.length > 0){
      res.status(200).json(Funcionarios);
      return
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener los funcionarios: ${error}`);
  }
};

export const getFuncionario = async (req, res) => {
  try {
    const Funcionario = await OfficialModel.findByPk(req.params.Id_Funcionario);
    if (Funcionario) {
      res.status(200).json(Funcionario);
      return
    } else {
      res.status(404).json({ message: "Funcionario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al obtener el funcionario: ${error}`);
  }
};

export const createFuncionario = async (req, res) => {
  try {
    const {
      Id_Funcionario,
      Nom_Funcionario,
      Ape_Funcionario,
      Genero,
      Tel_Funcionario,
      Estado,
      Cargo,
    } = req.body;
    const NewFuncionario = await OfficialModel.create({
      Id_Funcionario,
      Nom_Funcionario,
      Ape_Funcionario,
      Genero,
      Tel_Funcionario,
      Estado,
      Cargo,
    });
    if(NewFuncionario){
      res.status(201).json(NewFuncionario);
      return
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al crear el funcionario: ${error}`);
  }
};

export const updateFuncionario = async (req, res) => {
  try {
    const {
      Nom_Funcionario,
      Ape_Funcionario,
      Genero,
      Tel_Funcionario,
      Estado,
      Cargo,
    } = req.body;
    const [updated] = await OfficialModel.update(
      {
        Nom_Funcionario,
        Ape_Funcionario,
        Genero,
        Tel_Funcionario,
        Estado,
        Cargo,
      },
      {
        where: { Id_Funcionario: req.params.Id_Funcionario },
      }
    );
    if (updated === 0) {
      res.status(404).json({ message: "Funcionario no encontrado" });
    } else {
      res.json({ message: "Funcionario actualizado correctamente" });
      return
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al actualizar el funcionario: ${error}`);
  }
};

export const deleteFuncionario = async (req, res) => {
  try {
    const Result = await OfficialModel.destroy({
      where: { Id_Funcionario: req.params.Id_Funcionario },
    });
    if (Result === 0) {
      res.status(404).json({ message: "Funcionario no encontrado" });
    } else {
      res.json({ message: "Funcionario eliminado correctamente" });
      return
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al eliminar el funcionario: ${error}`);
  }
};

export const getQueryFuncionario = async (req, res) => {
  try {
    const Funcionarios = await OfficialModel.findAll({
      where: {
        Id_Funcionario: {
          [Op.like]: `%${req.params.Id_Funcionario}%`,
        },
      },
    });
    if(Funcionarios.length > 0){
      res.status(200).json(Funcionarios);
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(`Error al buscar el funcionario: ${error}`);
  }
};
