/**
 * Controlador para el contenido educativo del museo
 */

const contentData = require('../data/content.json');

/**
 * Obtener todo el contenido
 */
const getAllContent = (req, res) => {
  try {
    res.json({
      success: true,
      count: contentData.length,
      data: contentData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener el contenido'
    });
  }
};

/**
 * Obtener contenido por tipo (texto, video, imagen, etc.)
 */
const getContentByType = (req, res) => {
  try {
    const { type } = req.params;
    const filteredContent = contentData.filter(c => c.type === type);
    
    res.json({
      success: true,
      count: filteredContent.length,
      data: filteredContent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al filtrar el contenido'
    });
  }
};

module.exports = {
  getAllContent,
  getContentByType
};
