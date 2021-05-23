import { Clock, Scene, PerspectiveCamera, WebGLRenderer, SpotLight, SpotLightHelper, AnimationMixer, AnimationClip, LoopRepeat, Object3D } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class SceneManager implements ISceneManager {
    assetsLoaded: boolean = false;

    clock: Clock = new Clock();

    camera: PerspectiveCamera;
    scene: Scene;
    renderer: WebGLRenderer;
    spotlight: SpotLight;
    loader: GLTFLoader;
    avatar: Object3D;
    mixer: AnimationMixer;

    constructor(canvas: HTMLCanvasElement) {
        this.scene = new Scene();
		this.camera = this.buildCamera(canvas);
		this.renderer = this.buildRenderer(canvas);

		this.spotlight = new SpotLight( 0xffffff );
		this.spotlight.position.set( 1, 1, 7 );

		this.spotlight.castShadow = true;

		this.spotlight.shadow.mapSize.width = 1024;
		this.spotlight.shadow.mapSize.height = 1024;
		
		this.spotlight.shadow.camera.near = 500;
		this.spotlight.shadow.camera.far = 4000;
		this.spotlight.shadow.camera.fov = 30;

		const spotLightHelper = new SpotLightHelper( this.spotlight );
		this.scene.add( spotLightHelper );

		this.scene.add( this.spotlight );
		
		new OrbitControls( this.camera, this.renderer.domElement );

		this.loader = new GLTFLoader();
		
		this.loader.load('models/avatar.glb', (glft) => {
			this.scene.add(glft.scene);
			this.avatar = glft.scene;
			this.mixer = new AnimationMixer(this.avatar);

			this.camera.position.z = 10;

			const clip = AnimationClip.findByName(glft.animations, 'Walking');
			console.log('clip', clip);
			const action = this.mixer.clipAction( clip );
			action.setLoop(LoopRepeat, 9999);
			action.play();

            this.assetsLoaded = true;
		},
		function ( xhr ) {
			console.log( ( xhr.loaded ) + ' loaded' );
			console.log( ( xhr.total ) + ' total' );
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		function ( error ) {
			console.log('An error happened', error);
		});
    }

	buildCamera({ width, height }: { width: number, height: number }): PerspectiveCamera {
		const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 100; 
        const camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        return camera;
	}

    buildRenderer(canvas: HTMLCanvasElement): WebGLRenderer {
        const renderer = new WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
		console.log(canvas);
		console.log(window);
		
		console.log('width', canvas.width);
		
		
        renderer.setSize(canvas.width , +canvas.getAttribute("height"));

        return renderer;
    }

    update(): void {
        if (this.assetsLoaded) {
            var delta = this.clock.getDelta();
        
            if (this.mixer !== null) {
                this.mixer.update(delta);
            };
        
            this.renderer.render( this.scene, this.camera );
        }
    }

    onWindowResize(): void {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}

export default SceneManager;