import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Scene } from 'three';
import Avatar from './Avatar';

test('Constructor initializes loader, loads avatar and adds it to the scene', () => {
    let scene = new Scene();
    let avatar = new Avatar(scene);
    
    expect(avatar.loader).toBeInstanceOf(GLTFLoader);
});