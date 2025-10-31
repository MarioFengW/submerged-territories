/**
 * Controlador para las salas del museo
 */

const roomsData = require('../data/rooms.json');

/**
 * Obtener todas las salas del museo
 */
const getAllRooms = (req, res) => {
  try {
    res.json({
      success: true,
      count: roomsData.length,
      data: roomsData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener las salas'
    });
  }
};

/**
 * Obtener sala específica por ID
 */
const getRoomById = (req, res) => {
  try {
    const { id } = req.params;
    const room = roomsData.find(r => r.id === id);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Sala no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener la sala'
    });
  }
};

module.exports = {
  getAllRooms,
  getRoomById
};
