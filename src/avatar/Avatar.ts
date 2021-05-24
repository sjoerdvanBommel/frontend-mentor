import { AnimationClip, AnimationMixer, LoopRepeat, Object3D, Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Avatar implements IInteractiveSceneObject {
    loader: GLTFLoader;
    avatar: Object3D = new Object3D();
    mixer: AnimationMixer = new AnimationMixer(this.avatar);
    activeStates: Set<State> = new Set([State.Idle]);
    
    constructor(scene: Scene, loader?: GLTFLoader) {
        this.loader = loader ?? new GLTFLoader();
        
		this.loader.load('./../../models/avatar.glb', (glft) => {
			scene.add(glft.scene);
            
			this.avatar = glft.scene;
			this.mixer = new AnimationMixer(this.avatar);

			const clip = AnimationClip.findByName(glft.animations, 'Walking');
			const action = this.mixer.clipAction( clip );
			action.setLoop(LoopRepeat, 9999);
			action.play();
		},
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		function ( error ) {
			console.log('An error happened', error);
		});
    }

    update(time: number): void {
        this.mixer.update(time);
    }

    onKeyDown(e: KeyboardEvent): void {
        if (this.avatar instanceof Object3D) {
            switch(e.key) {
                case "ArrowUp":
                    this.addState(State.Walking);
                    break;
                case "ArrowDown":
                    this.addState(State.WalkingBackwards)
                    break;
                case "ArrowLeft":
                    this.addState(State.TurningLeft);
                    break;
                case "ArrowRight":
                    this.addState(State.TurningRight);
                    break;
            }
        }
    }

    onKeyUp(e: KeyboardEvent): void {
        if (this.avatar instanceof Object3D) {
            switch(e.key) {
                case "ArrowUp":
                    this.deleteState(State.Walking);
                    break;
                case "ArrowDown":
                    this.deleteState(State.WalkingBackwards);
                    break;
                case "ArrowLeft":
                    this.deleteState(State.TurningLeft);
                    break;
                case "ArrowRight":
                    this.deleteState(State.TurningRight);
                    break;
            }
        }
    }

    addState(state: State): void {
        this.activeStates.delete(State.Idle);
        this.activeStates.add(state);
    }

    deleteState(state: State): void {
        this.activeStates.delete(state);
        if (this.activeStates.size === 0) {
            this.addState(State.Idle);
        }
    }

    statesWithActions: IStateAction[] = [
        { [State.Idle]: () => {} },
        { [State.Walking]: (time: number) => this.avatar.translateZ(time * 2) },
        { [State.WalkingBackwards]: (time: number) => this.avatar.translateZ(-time * 2) },
        { [State.TurningLeft]: (time: number) => this.avatar.rotateY(time * 3) },
        { [State.TurningRight]: (time: number) => this.avatar.rotateY(time * -3) },
    ];
}

enum State {
    Idle, Walking, WalkingBackwards, TurningLeft, TurningRight, Running
}