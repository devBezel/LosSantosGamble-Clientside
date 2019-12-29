import * as alt from 'alt';
import * as game from 'natives';

export class Camera {

    private cam: any;
    private cameraHeight: number;
    private screenWidth: number;
    private screenHeight: number;
    private target: any;

    constructor(x: number, y: number, z: number, fov: number) {
        const args = game.getActiveScreenResolution(0, 0);

        this.cam = game.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', x, y, z, 0, 0, 0, fov, true, 0);

        this.cameraHeight = 0;
        this.screenWidth = args[1];
        this.screenHeight = args[2];
        this.target = undefined;
    }

    destroy() {
        game.destroyAllCams(true);
        game.renderScriptCams(false, false, 0, false, false, 0);
    }

    position(pos: any) {
        game.setCamCoord(this.cam, pos.x, pos.y, pos.z);
        game.setCamActive(this.cam, true);
        game.renderScriptCams(true, false, 0, true, false, 0);
    }

    fov(value: number) {
        game.setCamFov(this.cam, value);
        game.setCamActive(this.cam, true);
        game.renderScriptCams(true, false, 0, true, false, 0);
    }

    render() {
        game.setCamActive(this.cam, true);
        game.renderScriptCams(true, false, 0, true, false, 0);
    }

    rotate(rotX: number, rotY: number, rotZ: number) {
        game.setCamRot(this.cam, rotX, rotY, rotZ, 0);
        game.setCamActive(this.cam, true);
        game.renderScriptCams(true, false, 0, true, false, 2);
    }

    pointAtCoord(x: number, y: number, z: number) {
        game.pointCamAtCoord(this.cam, x, y, z);
        game.setCamActive(this.cam, true);
        game.renderScriptCams(true, false, 0, true, false, 0);
    }
}
