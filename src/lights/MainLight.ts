import { SpotLight, Scene } from 'three';

export default class MainLight implements ISceneObject {
    spotlight: SpotLight;
    possibleStatesWithActions: Map<number, (time: number) => void> = new Map();
    activeStates: Set<number> = new Set();
    
    constructor(scene: Scene) {
        this.spotlight = new SpotLight( 0xffffff );
		this.spotlight.position.set( 1, 1, 7 );

		this.spotlight.castShadow = true;

		this.spotlight.shadow.mapSize.width = 1024;
		this.spotlight.shadow.mapSize.height = 1024;
		
		this.spotlight.shadow.camera.near = 500;
		this.spotlight.shadow.camera.far = 4000;
		this.spotlight.shadow.camera.fov = 30;

        scene.add(this.spotlight);
    }

    update(time: number): void {
        // No updates, just a light
    }
}