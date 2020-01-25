const particles = [];
const particlesLengthMax = window.innerWidth < 500 ? 15 : Math.floor(window.innerWidth / 10);


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    particles.push(new Particle());
}

function draw() {
    background(55, 100, 144)
    particles.forEach((particle, index) => {
        var isEdge = particle.update();
        if (isEdge && particles.length < particlesLengthMax) {
            particles.push(new Particle());
        }
        particle.draw();
        particle.checkParticles(particles.slice(index))
    })
}

class Particle {
    constructor(position) {
        //Position
        this.position = createVector(random(width), random(height));
        //Velocity
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        //Size
        this.size = 10;
    }

    update() {
        this.position.add(this.velocity);
        var isEdge = this.edges();
        return isEdge
    }

    draw() {
        noStroke();
        fill('rgba(255,255,255,0.5)');
        circle(this.position.x, this.position.y, this.size);
    }

    edges() {
        if (this.position.x < 0 || this.position.x > width) {
            this.velocity.x *= -1;
            return true
        }

        if (this.position.y < 0 || this.position.y > height) {
            this.velocity.y *= -1;
            return true
        }
        return false
    }

    checkParticles(particles, mouseX, mouseY) {
        particles.forEach(particle => {
            const d = dist(this.position.x, this.position.y, particle.position.x, particle.position.y);

            if (d < 120) {
                stroke('rgba(255,255,255,0.3)');
                line(this.position.x, this.position.y, particle.position.x, particle.position.y);
            }
        })
    }
}