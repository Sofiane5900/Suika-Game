import {Engine, Render, Runner, Bodies, World } from "matter-js";

const engine = Engine.create();
const render = Render.create({
  engine, 
  element: document.body,
  options: {
    wireframes: false,
    background: "#e4d9b3",
    width: 620,
    height: 850,  
  },
});


const world = engine.world;

const ground = Bodies.rectangle(310, 820, 620, 60, {
  isStatic: true,
  render: { 
    fillStyle: "#bfa97a", 
  }
});


const leftWall = Bodies.rectangle(15, 395, 30, 790, {
  isStatic: true,
  render: { 
    fillStyle: "#bfa97a", 
  }
});


const rightWall = Bodies.rectangle(605, 395, 30, 790, {
  isStatic: true,
  render: { 
    fillStyle: "#bfa97a", 
  }
});



World.add(world, [ground, leftWall, rightWall]);

Render.run(render);
Runner.run(engine);

function addCurrentFruit() {
  const body = Bodies.circle(300, 50, 100, {
    render: {
      fillStyle: "green",
    },

  });

  World.add(world, body);
}

addCurrentFruit();