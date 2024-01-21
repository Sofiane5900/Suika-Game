import {Engine, Render, Runner, Bodies, World, Body, Sleeping } from "matter-js";

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

let currentFruit = null;
let interval = null;
let disableAction = false; 

function addCurrentFruit() {
  const body = Bodies.circle(300, 50, 20, {
    isSleeping: true,
    render: {
      fillStyle: "black",
    },
  });


  currentFruit = body;
  World.add(world, body);
}

window.onkeydown = (event) => {
  console.log(event);

  switch (event.code) {
    case "ArrowLeft":
      if (interval) return;
      interval = setInterval(() => {
        if (currentFruit.position.x - 20 > 30)
          Body.setPosition(currentFruit, {
            x: currentFruit.position.x - 1,
            y: currentFruit.position.y,
          });
      }, 5);
      break; // Add break statement here

    case "ArrowRight":
      if (interval) return;
      interval = setInterval(() => {
        if (currentFruit.position.x + 20 < 590)
          Body.setPosition(currentFruit, {
            x: currentFruit.position.x + 1,
            y: currentFruit.position.y,
          });
      }, 5);
      break; // Add break statement here

    case "Space":
      if (disableAction) return;
      disableAction = true;
      Sleeping.set(currentFruit, false);
      setTimeout(() => {
        addCurrentFruit();
        disableAction = false;
      }, 1000);
  }
};

window.onkeyup = (event) => { 
  switch (event.code) {
    case "ArrowRight":
    case "ArrowLeft":
      clearInterval(interval);
      interval = null;
  }

}

addCurrentFruit();