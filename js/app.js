let container;
let camera;
let renderer;
let scene;
let mesh;

function init(){
	// get a reference to the container element that will hold our scene
	container = document.querySelector('#scene-container');
  // create a Scene
  scene = new THREE.Scene();
  // set the background color
  scene.background = new THREE.Color('red');
  // create a camera
  const fov = 35; // field of view (valid range for the FOV is from 1 to 179 degrees)
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1; // the near clipping plane
  const far = 100; // the far clipping plane

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // every object is initially created at (0, 0, 0)
  // we'll move the camera back a bit so that we can view the scene
  camera.position.set(0, 0, 10);

  // create a geometry
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

  // create a default (white) Basic material
  const material = new THREE.MeshStandardMaterial({ color: 'white' });

  // create a Mesh containing the geometry and material
  mesh = new THREE.Mesh( geometry, material );

  // add the mesh to the scene
  scene.add(mesh);

  //create a directional light
  const light = new THREE.DirectionalLight( 0xffffff, 5.0);

  //move the light back and up a bit
  light.position.set(10, 10, 10);

  //add the light to the scene
  scene.add(light);

  // create the renderer
  renderer = new THREE.WebGLRenderer({ antialiasing: true });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // add the automatically created <canvas> element to the page
  container.appendChild(renderer.domElement);
}

function animate(){
  // call animate recursively
  requestAnimationFrame(animate);

  // increase the mesh's rotation each frame
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  // render or 'create a still image' of the scene
  renderer.render(scene, camera);
}

init();
animate();


