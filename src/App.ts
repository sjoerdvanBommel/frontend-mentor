import { Clock, Scene, PerspectiveCamera, WebGLRenderer, SpotLight, SpotLightHelper, AnimationMixer, AnimationClip, LoopRepeat, Object3D } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

var clock = new Clock();

let camera: PerspectiveCamera;
let scene: Scene;
let renderer: WebGLRenderer;
let spotlight: SpotLight;
let loader: GLTFLoader;
let avatar: Object3D;
let mixer: AnimationMixer;

class App {
	init() {
		window.addEventListener( 'resize', onWindowResize, false );

		scene = new Scene();
		camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		
		renderer = new WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		spotlight = new SpotLight( 0xffffff );
		spotlight.position.set( 1, 1, 7 );

		spotlight.castShadow = true;

		spotlight.shadow.mapSize.width = 1024;
		spotlight.shadow.mapSize.height = 1024;
		
		spotlight.shadow.camera.near = 500;
		spotlight.shadow.camera.far = 4000;
		spotlight.shadow.camera.fov = 30;

		const spotLightHelper = new SpotLightHelper( spotlight );
		scene.add( spotLightHelper );

		scene.add( spotlight );
		
		new OrbitControls( camera, renderer.domElement );

		loader = new GLTFLoader();
		
		loader.load('models/avatar.glb', (glft) => {
			scene.add(glft.scene);
			avatar = glft.scene;
			mixer = new AnimationMixer(avatar);

			camera.position.z = 10;

			const clip = AnimationClip.findByName(glft.animations, 'Walking');
			console.log('clip', clip);
			const action = mixer.clipAction( clip );
			action.setLoop(LoopRepeat, 9999);
			action.play();
	
			animate();
		},
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		function ( error ) {
			console.log('An error happened', error);
		});
	}
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
	requestAnimationFrame( animate );

	var delta = clock.getDelta();

	if (mixer !== null) {
		mixer.update(delta);
	};

	renderer.render( scene, camera );
}

export default App;
