/**
 * Controlador para las exhibiciones del museo
 */

const exhibitsData = require('../data/exhibits.json');

/**
 * Obtener todas las exhibiciones
 */
const getAllExhibits = (req, res) => {
  try {
    res.json({
      success: true,
      count: exhibitsData.length,
      data: exhibitsData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener las exhibiciones'
    });
  }
};

/**
 * Obtener exhibiciones por sala
 */
const getExhibitsByRoom = (req, res) => {
  try {
    const { roomId } = req.params;
    const exhibits = exhibitsData.filter(e => e.roomId === roomId);
    
    res.json({
      success: true,
      count: exhibits.length,
      data: exhibits
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener las exhibiciones'
    });
  }
};

module.exports = {
  getAllExhibits,
  getExhibitsByRoom
};
