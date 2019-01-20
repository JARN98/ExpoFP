export class UploadImageDto {
    image: File;

    constructor(image: File) {
        this.image = image;
    }
}
