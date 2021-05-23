import { AnimationClip, AnimationMixer, LoopRepeat, Object3D, Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Avatar implements ISceneObject {
    isLoaded: boolean = false;
    loader: GLTFLoader;
    avatar: Object3D;
    mixer: AnimationMixer;
    
    constructor(scene: Scene) {
        this.loader = new GLTFLoader();
        
		this.loader.load('./../../models/avatar.glb', (glft) => {
			scene.add(glft.scene);
            
			this.avatar = glft.scene;
			this.mixer = new AnimationMixer(this.avatar);

			const clip = AnimationClip.findByName(glft.animations, 'Walking');
			const action = this.mixer.clipAction( clip );
			action.setLoop(LoopRepeat, 9999);
			action.play();

            this.isLoaded = true;
		},
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		function ( error ) {
			console.log('An error happened', error);
		});
    }

    update(time: number): void {
        if (this.isLoaded) {
            if (this.mixer !== null) {
                this.mixer.update(time);
            };
        }
    }
}