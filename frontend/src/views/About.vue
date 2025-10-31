<!-- 
  Vista "Acerca de" del museo
-->

<template>
  <div class="about-view">
    <h1 class="page-title">
      ℹ️ Museo Virtual de Axolote y Manglar
    </h1>

    <div class="about-content">
      <section class="manga-panel">
        <h2>🌊 Nuestra Misión</h2>
        <p>
          El Museo Virtual de Axolote y Manglar es una experiencia educativa inmersiva dedicada 
          a la conservación de dos ecosistemas acuáticos fundamentales: los canales de Xochimilco, 
          hogar del axolote mexicano, y los manglares costeros, guardianes de nuestras costas. 
          A través de tecnología 3D interactiva y datos científicos en tiempo real, conectamos 
          a las personas con estos tesoros naturales en peligro.
        </p>
      </section>

      <section class="manga-panel highlight-panel">
        <h2>🦎 El Axolote Mexicano</h2>
        <p>
          El axolote (<em>Ambystoma mexicanum</em>) es una especie endémica de México, conocido como 
          "el monstruo del agua" en náhuatl. Con sus branquias externas rosadas y su extraordinaria 
          capacidad de regeneración, el axolote representa un tesoro biológico único. Desafortunadamente, 
          está críticamente en peligro de extinción, con menos de 1,000 individuos en estado salvaje, 
          habitando únicamente en los canales de Xochimilco, Ciudad de México.
        </p>
      </section>

      <section class="manga-panel highlight-panel">
        <h2>🌿 Los Manglares</h2>
        <p>
          Los manglares son ecosistemas costeros vitales que actúan como viveros naturales para 
          innumerables especies marinas, protegen las costas de tormentas y erosión, y capturan 
          grandes cantidades de carbono. Estos bosques entre dos mundos (tierra y mar) albergan 
          una biodiversidad extraordinaria y son fundamentales para las comunidades pesqueras. 
          Sin embargo, están desapareciendo a un ritmo alarmante debido a la urbanización y 
          contaminación.
        </p>
      </section>

      <section class="manga-panel">
        <h2>🎯 Objetivos del Museo</h2>
        <ul class="objectives-list">
          <li>Educar sobre la importancia ecológica del axolote y los manglares</li>
          <li>Concientizar sobre las amenazas que enfrentan estos ecosistemas</li>
          <li>Promover acciones concretas de conservación y restauración</li>
          <li>Conectar a las personas con la naturaleza a través de tecnología inmersiva</li>
          <li>Proporcionar información científica actualizada en tiempo real</li>
          <li>Inspirar a las nuevas generaciones a proteger nuestro patrimonio natural</li>
        </ul>
      </section>

      <section class="manga-panel">
        <h2>🎨 Experiencia Interactiva</h2>
        <p>
          Nuestro museo utiliza modelos 3D de alta calidad, visualizaciones ASCII artísticas, 
          y datos científicos obtenidos de APIs especializadas para ofrecer una experiencia 
          educativa única. Cada visitante puede explorar los hábitats, conocer las especies, 
          y comprender la urgencia de su conservación de manera visual e interactiva.
        </p>
      </section>

      <section class="manga-panel tech-stack">
        <h2>💻 Tecnologías</h2>
        <div class="tech-grid">
          <div class="tech-item">
            <div class="tech-icon">⚡</div>
            <div class="tech-name">Vue.js 3</div>
            <div class="tech-desc">Framework reactivo</div>
          </div>
          <div class="tech-item">
            <div class="tech-icon">🎨</div>
            <div class="tech-name">Three.js</div>
            <div class="tech-desc">Modelos 3D interactivos</div>
          </div>
          <div class="tech-item">
            <div class="tech-icon">🚂</div>
            <div class="tech-name">Node.js</div>
            <div class="tech-desc">Backend con Express</div>
          </div>
          <div class="tech-item">
            <div class="tech-icon">🔬</div>
            <div class="tech-name">APIs Científicas</div>
            <div class="tech-desc">Datos en tiempo real</div>
          </div>
        </div>
      </section>

      <section class="manga-panel conservation-panel">
        <h2>🌍 ¿Por Qué Es Importante?</h2>
        <div class="conservation-grid">
          <div class="conservation-card">
            <div class="card-icon">🦎</div>
            <h3>Axolotes</h3>
            <p>Única especie capaz de regenerar órganos complejos. Su estudio podría revolucionar la medicina regenerativa.</p>
          </div>
          <div class="conservation-card">
            <div class="card-icon">🌿</div>
            <h3>Manglares</h3>
            <p>Capturan 4 veces más carbono que los bosques terrestres, combatiendo el cambio climático.</p>
          </div>
          <div class="conservation-card">
            <div class="card-icon">🐟</div>
            <h3>Biodiversidad</h3>
            <p>Ambos ecosistemas son el hogar de cientos de especies, muchas en peligro de extinción.</p>
          </div>
          <div class="conservation-card">
            <div class="card-icon">🏛️</div>
            <h3>Patrimonio Cultural</h3>
            <p>Representan la conexión ancestral entre las culturas mexicanas y la naturaleza.</p>
          </div>
        </div>
      </section>

      <section class="manga-panel cta-section">
        <h2>🚀 ¡Explora y Aprende!</h2>
        <p>
          Descubre la fascinante vida del axolote y la importancia de los manglares. 
          Cada visita nos acerca más a su conservación.
        </p>
        <router-link to="/rooms" class="btn-explore">
          Explorar Salas del Museo
        </router-link>
      </section>
    </div>
  </div>
</template>

<script setup>
// No necesita lógica adicional por ahora
</script>

<style scoped>
.about-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

.page-title {
  font-size: 2.5rem;
  color: #000000;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: bold;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.manga-panel {
  background: #ffffff;
  padding: 2rem;
  border-radius: 0;
  box-shadow: 6px 6px 0 #000000;
  border: 4px solid #000000;
  position: relative;
}

.manga-panel::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 20px;
  width: 50px;
  height: 8px;
  background: #000000;
}

.manga-panel h2 {
  color: #000000;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  font-weight: bold;
}

.manga-panel p {
  line-height: 1.8;
  color: #000000;
  font-size: 1.1rem;
  font-family: 'Courier New', monospace;
}

.objectives-list {
  list-style: none;
  padding: 0;
}

.objectives-list li {
  padding: 0.75rem 0;
  padding-left: 2rem;
  position: relative;
  font-size: 1.1rem;
  color: #000000;
  font-family: 'Courier New', monospace;
}

.objectives-list li::before {
  content: '■';
  position: absolute;
  left: 0;
  color: #000000;
  font-weight: bold;
  font-size: 1.3rem;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.tech-item {
  text-align: center;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 0;
  transition: transform 0.3s ease;
  border: 3px solid #000000;
  box-shadow: 3px 3px 0 #000000;
}

.tech-item:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 #000000;
}

.tech-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  filter: grayscale(100%) contrast(200%);
}

.tech-name {
  font-weight: bold;
  color: #000000;
  margin-bottom: 0.25rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
}

.tech-desc {
  font-size: 0.9rem;
  color: #000000;
  font-family: 'Courier New', monospace;
}

.cta-section {
  text-align: center;
  background: #000000;
  color: #ffffff;
  border-color: #ffffff;
  border-width: 4px;
}

.cta-section h2 {
  color: #ffffff;
}

.cta-section p {
  color: #ffffff;
  opacity: 0.95;
}

.btn-explore {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 1rem 2.5rem;
  background: #ffffff;
  color: #000000;
  text-decoration: none;
  border-radius: 0;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 4px 4px 0 #ffffff;
  border: 3px solid #ffffff;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.btn-explore:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #ffffff;
}

.highlight-panel {
  background: linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%);
  border-color: #E91E63;
  border-width: 4px;
}

.highlight-panel h2 {
  color: #E91E63;
  border-bottom: 3px solid #E91E63;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.highlight-panel em {
  font-style: italic;
  color: #E91E63;
  font-weight: bold;
}

.conservation-panel {
  background: #f5f5f5;
}

.conservation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.conservation-card {
  background: #ffffff;
  padding: 1.5rem;
  border: 3px solid #000000;
  box-shadow: 4px 4px 0 #000000;
  text-align: center;
  transition: transform 0.3s ease;
}

.conservation-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000000;
}

.conservation-card .card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.conservation-card h3 {
  font-size: 1.2rem;
  color: #000000;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  font-weight: bold;
}

.conservation-card p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333333;
  font-family: 'Courier New', monospace;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.8rem;
  }
  
  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .conservation-grid {
    grid-template-columns: 1fr;
  }
}
</style>
