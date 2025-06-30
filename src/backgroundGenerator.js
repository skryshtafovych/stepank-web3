// AI Background Generator - Lightweight browser-based pattern generation
class BackgroundGenerator {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.userSeed = this.generateUserSeed();
    this.patterns = [
      'geometric',
      'organic',
      'particles',
      'waves',
      'grid',
      'circles',
      'hexagons',
      'abstract',
      'dotMatrix',
      'gradientMesh',
      'linePattern'
    ];
  }

  // Generate a unique seed based on user's browser fingerprint
  generateUserSeed() {
    const userAgent = navigator.userAgent;
    const screenRes = `${screen.width}x${screen.height}`;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;
    
    // Create a simple hash from user characteristics
    let hash = 0;
    const str = userAgent + screenRes + timeZone + language;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Initialize canvas
  init(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  // Resize canvas to fill viewport
  resizeCanvas() {
    if (!this.canvas) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // Generate a random number based on user seed
  seededRandom() {
    this.userSeed = (this.userSeed * 9301 + 49297) % 233280;
    return this.userSeed / 233280;
  }

  // Generate HSL color based on user seed
  generateColor(hueOffset = 0, saturation = 60, lightness = 50) {
    const hue = (this.seededRandom() * 360 + hueOffset) % 360;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  // Generate sophisticated color palette with limited colors
  generateSophisticatedColor() {
    const baseHue = this.seededRandom() * 360;
    const colorVariants = [
      `hsl(${baseHue}, 15%, 8%)`,      // Dark base
      `hsl(${baseHue}, 20%, 12%)`,    // Slightly lighter
      `hsl(${baseHue}, 25%, 16%)`,    // Medium
      `hsl(${baseHue + 30}, 18%, 10%)`, // Complementary
      `hsl(${baseHue + 180}, 12%, 6%)`  // Contrast
    ];
    return colorVariants[Math.floor(this.seededRandom() * colorVariants.length)];
  }

  // Generate subtle gradient overlay for depth
  generateSubtleGradient() {
    const { width, height } = this.canvas;
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
    return gradient;
  }

  // Generate noise texture for subtle grain effect
  generateNoiseTexture() {
    const { width, height } = this.canvas;
    const imageData = this.ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = (this.seededRandom() - 0.5) * 20;
      data[i] = Math.max(0, Math.min(255, noise));     // R
      data[i + 1] = Math.max(0, Math.min(255, noise)); // G
      data[i + 2] = Math.max(0, Math.min(255, noise)); // B
      data[i + 3] = 15; // Very subtle alpha
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }

  // Generate geometric pattern
  generateGeometricPattern() {
    const { width, height } = this.canvas;
    const size = Math.min(width, height) / 12; // Larger, fewer elements
    
    this.ctx.clearRect(0, 0, width, height);
    
    // Create sophisticated gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, this.generateSophisticatedColor());
    gradient.addColorStop(1, this.generateSophisticatedColor());
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw fewer, larger geometric shapes
    for (let x = 0; x < width + size; x += size * 2.5) {
      for (let y = 0; y < height + size; y += size * 2.5) {
        const shape = Math.floor(this.seededRandom() * 2); // Only 2 shapes for sophistication
        const color = this.generateSophisticatedColor();
        
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = 0.15; // Much more subtle
        
        switch (shape) {
          case 0: // Circle
            this.ctx.beginPath();
            this.ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
            this.ctx.fill();
            break;
          case 1: // Square
            this.ctx.fillRect(x, y, size, size);
            break;
        }
      }
    }
    
    // Add gradient overlay for depth
    this.ctx.fillStyle = this.generateSubtleGradient();
    this.ctx.globalAlpha = 0.3;
    this.ctx.fillRect(0, 0, width, height);
    
    // Add noise texture
    this.generateNoiseTexture();
    
    this.ctx.globalAlpha = 1;
  }

  // Generate organic pattern
  generateOrganicPattern() {
    const { width, height } = this.canvas;
    
    this.ctx.clearRect(0, 0, width, height);
    
    // Create sophisticated organic background
    const gradient = this.ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
    gradient.addColorStop(0, this.generateSophisticatedColor());
    gradient.addColorStop(1, this.generateSophisticatedColor());
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw fewer, larger organic blobs
    for (let i = 0; i < 8; i++) { // Fewer blobs
      const x = this.seededRandom() * width;
      const y = this.seededRandom() * height;
      const radius = 80 + this.seededRandom() * 200; // Larger radius
      const color = this.generateSophisticatedColor();
      
      this.ctx.fillStyle = color;
      this.ctx.globalAlpha = 0.08; // Much more subtle
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    // Add gradient overlay for depth
    this.ctx.fillStyle = this.generateSubtleGradient();
    this.ctx.globalAlpha = 0.3;
    this.ctx.fillRect(0, 0, width, height);
    
    // Add noise texture
    this.generateNoiseTexture();
    
    this.ctx.globalAlpha = 1;
  }

  // Generate particle system
  generateParticlePattern() {
    const { width, height } = this.canvas;
    const particles = [];
    const particleCount = 25; // Much fewer particles
    
    this.ctx.clearRect(0, 0, width, height);
    
    // Create sophisticated dark gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, this.generateSophisticatedColor());
    gradient.addColorStop(1, this.generateSophisticatedColor());
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Generate sophisticated particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: this.seededRandom() * width,
        y: this.seededRandom() * height,
        vx: (this.seededRandom() - 0.5) * 0.5, // Much slower movement
        vy: (this.seededRandom() - 0.5) * 0.5, // Much slower movement
        size: 1 + this.seededRandom() * 2, // Smaller particles
        color: this.generateSophisticatedColor()
      });
    }
    
    // Animate particles with much more subtle movement
    const animate = () => {
      this.ctx.globalAlpha = 0.05; // Much more subtle fade
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      this.ctx.fillRect(0, 0, width, height);
      this.ctx.globalAlpha = 0.3; // Subtle particle visibility
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
        
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }

  // Generate wave pattern
  generateWavePattern() {
    const { width, height } = this.canvas;
    
    this.ctx.clearRect(0, 0, width, height);
    
    // Create sophisticated gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, this.generateSophisticatedColor());
    gradient.addColorStop(1, this.generateSophisticatedColor());
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw fewer, more sophisticated waves
    for (let i = 0; i < 2; i++) { // Only 2 waves
      const amplitude = 30 + this.seededRandom() * 60; // Smaller amplitude
      const frequency = 0.005 + this.seededRandom() * 0.01; // Lower frequency
      const color = this.generateSophisticatedColor();
      
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 1; // Thinner lines
      this.ctx.globalAlpha = 0.12; // Much more subtle
      
      this.ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = height/2 + Math.sin(x * frequency + this.seededRandom() * Math.PI) * amplitude;
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.stroke();
    }
    
    this.ctx.globalAlpha = 1;
  }

  // Generate grid pattern
  generateGridPattern() {
    const { width, height } = this.canvas;
    const gridSize = 80 + this.seededRandom() * 120; // Larger grid cells
    
    this.ctx.clearRect(0, 0, width, height);
    
    // Create sophisticated background
    const gradient = this.ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
    gradient.addColorStop(0, this.generateSophisticatedColor());
    gradient.addColorStop(1, this.generateSophisticatedColor());
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw sophisticated grid
    this.ctx.strokeStyle = this.generateSophisticatedColor();
    this.ctx.lineWidth = 0.5; // Very thin lines
    this.ctx.globalAlpha = 0.08; // Very subtle
    
    // Vertical lines
    for (let x = 0; x < width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
      this.ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();
    }
    
    this.ctx.globalAlpha = 1;
  }

  // Generate circle pattern
  generateCirclePattern() {
    const { width, height } = this.canvas;
    
    this.ctx.clearRect(0, 0, width, height);
    
    // Create sophisticated background
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, this.generateSophisticatedColor());
    gradient.addColorStop(1, this.generateSophisticatedColor());
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw fewer, larger circles
    for (let i = 0; i < 12; i++) { // Fewer circles
      const x = this.seededRandom() * width;
      const y = this.seededRandom() * height;
      const radius = 40 + this.seededRandom() * 120; // Larger radius
      const color = this.generateSophisticatedColor();
      
      this.ctx.fillStyle = color;
      this.ctx.globalAlpha = 0.1; // Much more subtle
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    this.ctx.globalAlpha = 1;
  }

  // Generate hexagon pattern
  generateHexagonPattern() {
    const { width, height } = this.canvas;
    const hexSize = 60; // Larger hexagons
    
    this.ctx.clearRect(0, 0, width, height);
    
    // Create sophisticated background
    const gradient = this.ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
    gradient.addColorStop(0, this.generateSophisticatedColor());
    gradient.addColorStop(1, this.generateSophisticatedColor());
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw sophisticated hexagons
    for (let x = 0; x < width + hexSize; x += hexSize * 2) { // More spacing
      for (let y = 0; y < height + hexSize; y += hexSize * 1.8) { // More spacing
        const color = this.generateSophisticatedColor();
        
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = 0.08; // Much more subtle
        
        this.drawHexagon(x, y, hexSize);
      }
    }
    
    this.ctx.globalAlpha = 1;
  }

  // Helper function to draw hexagon
  drawHexagon(x, y, size) {
    this.ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const px = x + size * Math.cos(angle);
      const py = y + size * Math.sin(angle);
      if (i === 0) {
        this.ctx.moveTo(px, py);
      } else {
        this.ctx.lineTo(px, py);
      }
    }
    this.ctx.closePath();
    this.ctx.fill();
  }

  // Generate abstract pattern
  generateAbstractPattern() {
    const { width, height } = this.canvas;
    
    this.ctx.clearRect(0, 0, width, height);
    
    // Create sophisticated background
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, this.generateSophisticatedColor());
    gradient.addColorStop(0.5, this.generateSophisticatedColor());
    gradient.addColorStop(1, this.generateSophisticatedColor());
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw fewer, more sophisticated abstract shapes
    for (let i = 0; i < 5; i++) { // Fewer shapes
      const color = this.generateSophisticatedColor();
      this.ctx.fillStyle = color;
      this.ctx.globalAlpha = 0.12; // Much more subtle
      
      this.ctx.beginPath();
      for (let j = 0; j < 4; j++) { // Simpler shapes
        const x = this.seededRandom() * width;
        const y = this.seededRandom() * height;
        if (j === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.closePath();
      this.ctx.fill();
    }
    
    this.ctx.globalAlpha = 1;
  }

  // Generate sophisticated dot matrix pattern
  generateDotMatrixPattern() {
    const { width, height } = this.canvas;
    
    this.ctx.clearRect(0, 0, width, height);
    
    // Create sophisticated base gradient
    const gradient = this.ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
    gradient.addColorStop(0, this.generateSophisticatedColor());
    gradient.addColorStop(1, this.generateSophisticatedColor());
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw subtle dot matrix
    const dotSize = 1;
    const spacing = 40;
    
    this.ctx.fillStyle = this.generateSophisticatedColor();
    this.ctx.globalAlpha = 0.06;
    
    for (let x = spacing; x < width; x += spacing) {
      for (let y = spacing; y < height; y += spacing) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
    
    // Add gradient overlay
    this.ctx.fillStyle = this.generateSubtleGradient();
    this.ctx.fillRect(0, 0, width, height);
    
    // Add noise texture
    this.generateNoiseTexture();
    
    this.ctx.globalAlpha = 1;
  }

  // Generate sophisticated gradient mesh pattern
  generateGradientMeshPattern() {
    const { width, height } = this.canvas;
    
    this.ctx.clearRect(0, 0, width, height);
    
    // Create base color
    const baseColor = this.generateSophisticatedColor();
    this.ctx.fillStyle = baseColor;
    this.ctx.fillRect(0, 0, width, height);
    
    // Create gradient mesh overlay
    const meshSize = 200;
    this.ctx.globalAlpha = 0.08;
    
    for (let x = 0; x < width + meshSize; x += meshSize) {
      for (let y = 0; y < height + meshSize; y += meshSize) {
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, meshSize/2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x - meshSize/2, y - meshSize/2, meshSize, meshSize);
      }
    }
    
    // Add subtle gradient overlay
    this.ctx.fillStyle = this.generateSubtleGradient();
    this.ctx.globalAlpha = 0.3;
    this.ctx.fillRect(0, 0, width, height);
    
    // Add noise texture
    this.generateNoiseTexture();
    
    this.ctx.globalAlpha = 1;
  }

  // Generate sophisticated line pattern
  generateLinePattern() {
    const { width, height } = this.canvas;
    
    this.ctx.clearRect(0, 0, width, height);
    
    // Create base gradient
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, this.generateSophisticatedColor());
    gradient.addColorStop(1, this.generateSophisticatedColor());
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);
    
    // Draw subtle diagonal lines
    const lineSpacing = 60;
    this.ctx.strokeStyle = this.generateSophisticatedColor();
    this.ctx.lineWidth = 0.5;
    this.ctx.globalAlpha = 0.05;
    
    for (let i = -height; i < width + height; i += lineSpacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i + height, height);
      this.ctx.stroke();
    }
    
    // Add gradient overlay
    this.ctx.fillStyle = this.generateSubtleGradient();
    this.ctx.globalAlpha = 0.4;
    this.ctx.fillRect(0, 0, width, height);
    
    // Add noise texture
    this.generateNoiseTexture();
    
    this.ctx.globalAlpha = 1;
  }

  // Generate background based on user seed
  generateBackground() {
    const patternIndex = this.userSeed % this.patterns.length;
    const pattern = this.patterns[patternIndex];
    
    switch (pattern) {
      case 'geometric':
        this.generateGeometricPattern();
        break;
      case 'organic':
        this.generateOrganicPattern();
        break;
      case 'particles':
        this.generateParticlePattern();
        break;
      case 'waves':
        this.generateWavePattern();
        break;
      case 'grid':
        this.generateGridPattern();
        break;
      case 'circles':
        this.generateCirclePattern();
        break;
      case 'hexagons':
        this.generateHexagonPattern();
        break;
      case 'abstract':
        this.generateAbstractPattern();
        break;
      case 'dotMatrix':
        this.generateDotMatrixPattern();
        break;
      case 'gradientMesh':
        this.generateGradientMeshPattern();
        break;
      case 'linePattern':
        this.generateLinePattern();
        break;
      default:
        this.generateGeometricPattern();
    }
  }

  // Get background as data URL for CSS
  getBackgroundDataURL() {
    return this.canvas.toDataURL('image/png');
  }
}

export default BackgroundGenerator; 