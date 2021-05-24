import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Clock, Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import Avatar from '../avatar/Avatar';
import MainLight from '../lights/MainLight';
import ISceneManager from './ISceneManager';

class SceneManager implements ISceneManager {
    clock: Clock = new Clock();
    camera: PerspectiveCamera;
    scene: Scene;
    renderer: WebGLRenderer;
    sceneObjects: ISceneObject[];

    constructor(canvas: HTMLCanvasElement) {
        this.scene = new Scene();
		this.camera = this.buildCamera(canvas);
		this.renderer = this.buildRenderer(canvas);
        this.sceneObjects = this.buildSceneObjects(this.scene);
        
		new OrbitControls( this.camera, this.renderer.domElement );
    }

	buildCamera({ width, height }: { width: number, height: number }): PerspectiveCamera {
		const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 100; 
        const camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.position.z = 10;
        return camera;
	}

    buildRenderer(canvas: HTMLCanvasElement): WebGLRenderer {
        const renderer = new WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(canvas.width , canvas.height);

        return renderer;
    }

    buildSceneObjects(scene: Scene): ISceneObject[] {
        return [
            new MainLight(scene),
            new Avatar(scene)
        ];
    }

    update(): void {
        const delta = this.clock.getDelta();
    
        for (let i = 0; i < this.sceneObjects.length; i++) {
        	this.sceneObjects[i].update(delta);
        	this.sceneObjects[i].activeStates.forEach(x => this.sceneObjects[i].statesWithActions[x][x](delta));
        }

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize({ width, height }: { width: number, height: number }): void {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }

    onKeyDown(e: KeyboardEvent): void {
        this.getInteractiveSceneObjects().forEach(x => x.onKeyDown(e));
    }

    onKeyUp(e: KeyboardEvent): void {
        this.getInteractiveSceneObjects().forEach(x => x.onKeyUp(e));
    }

    getInteractiveSceneObjects(): IInteractiveSceneObject[] {
        return this.sceneObjects.filter(x => this.isInteractiveSceneObject(x)).map(x => x as IInteractiveSceneObject);
    }

    isInteractiveSceneObject(object: ISceneObject): object is IInteractiveSceneObject {
        return 'onKeyDown' in object && 'onKeyUp' in object;
    }
}

export default SceneManager;