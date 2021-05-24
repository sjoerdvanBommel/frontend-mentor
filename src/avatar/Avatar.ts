import { AnimationClip, AnimationMixer, LoopRepeat, Object3D, Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Avatar implements IInteractiveSceneObject {
    loader: GLTFLoader;
    avatar: Object3D = new Object3D();
    mixer: AnimationMixer = new AnimationMixer(this.avatar);
    activeStates: Set<AvatarState> = new Set([AvatarState.Idle]);
    
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
                    this.addState(AvatarState.Walking);
                    break;
                case "ArrowDown":
                    this.addState(AvatarState.WalkingBackwards)
                    break;
                case "ArrowLeft":
                    this.addState(AvatarState.TurningLeft);
                    break;
                case "ArrowRight":
                    this.addState(AvatarState.TurningRight);
                    break;
            }
        }
    }

    onKeyUp(e: KeyboardEvent): void {
        if (this.avatar instanceof Object3D) {
            switch(e.key) {
                case "ArrowUp":
                    this.deleteState(AvatarState.Walking);
                    break;
                case "ArrowDown":
                    this.deleteState(AvatarState.WalkingBackwards);
                    break;
                case "ArrowLeft":
                    this.deleteState(AvatarState.TurningLeft);
                    break;
                case "ArrowRight":
                    this.deleteState(AvatarState.TurningRight);
                    break;
            }
        }
    }

    addState(state: AvatarState): void {
        this.activeStates.delete(AvatarState.Idle);
        this.activeStates.add(state);
    }

    deleteState(state: AvatarState): void {
        this.activeStates.delete(state);
        if (this.activeStates.size === 0) {
            this.addState(AvatarState.Idle);
        }
    }

    possibleStatesWithActions: Map<number, (time: number) => void> = new Map([
        [AvatarState.Idle, (_) => {}],
        [AvatarState.Walking, (time: number) => this.avatar.translateZ(time * 2)],
        [AvatarState.WalkingBackwards, (time: number) => this.avatar.translateZ(time * -2)],
        [AvatarState.TurningLeft, (time: number) => this.avatar.rotateY(time * 3)],
        [AvatarState.TurningRight, (time: number) => this.avatar.rotateY(time * -3)],
    ]);
}

enum AvatarState {
    Idle, Walking, WalkingBackwards, TurningLeft, TurningRight, Running
}