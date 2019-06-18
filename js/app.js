let container;
let camera;
let renderer;
let scene;
let mesh;
let controls;

function init(){
	// get a reference to the container element that will hold our scene
	container = document.querySelector('#scene-container');
  // create a Scene
  scene = new THREE.Scene();
  // set the background color
  scene.background = new THREE.Color('red');

  createCamera();
  createControls();
  createLights();
  createMeshes();
  createRenderer();

  renderer.setAnimationLoop( () => {
    update();
    render();
  })
}

function createCamera(){
  // create a camera
  camera = new THREE.PerspectiveCamera(
    35, //FOV
    container.clientWidth / container.clientHeight,
    0.1, // near clipping plane
    100 // far clipping plane
  );

  // every object is initially created at (0, 0, 0)
  // we'll move the camera back a bit so that we can view the scene
  camera.position.set(0, 0, 10);
};

function createLights(){
  //create a directional light
  const light = new THREE.DirectionalLight( 0xffffff, 3.0);

  //move the light back and up a bit
  light.position.set(-4, -4, 10);

  //add the light to the scene
  scene.add(light);
};

function createControls(){
  controls = new THREE.OrbitControls(camera, container)
}

function createMeshes(){
  // create a geometry
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

  // create a texture loader
  const textureLoader = new THREE.TextureLoader();

  // load a texture
  const texture = textureLoader.load('./textures/putin-wink.jpg');

  //set the "color space" of the texture
  texture.encoding = THREE.sRGBEncoding;

  // reduce blurring at glancing angles
  texture.anisotropy = 16;

  // create a Standard material using the texture we loaded as a color map
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });

  // create a default (white) Basic material
    // const material = new THREE.MeshStandardMaterial({ color: 'white' });

  // create a Mesh containing the geometry and material
  mesh = new THREE.Mesh( geometry, material );

  // add the mesh to the scene
  scene.add(mesh);
};

function createRenderer(){
  // create the renderer
  renderer = new THREE.WebGLRenderer({ antialiasing: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // set the gamma correction so that the output colors look
  // correct on the screens
  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  // add the automatically created <canvas> element to the page
  container.appendChild(renderer.domElement);
};

function update(){
  // increase the mesh's rotation each frame
    // mesh.rotation.z += 0.01;
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
};

function render(){
  renderer.render(scene, camera);
};

// stop the loop:
// renderer.setAnimationLoop( null );

// handle device window resize
function onWindowResize(){
  // set the aspect ration to match the browser window
  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer and the canvas 
  renderer.setSize(container.clientWidth, container.clientHeight);
};

window.addEventListener('resize', onWindowResize);

init();


