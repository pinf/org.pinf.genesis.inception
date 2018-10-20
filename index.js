
const PATH = require("path");
const FS = require("fs");

class Workspace {

    constructor (baseDir) {
        let self = this;

        self.baseDir = baseDir;
        self.origin = null;

        self.relBinPath = ".~bin";
        self.relIdPath = ".workspace.id";
        self.relPackagesPath = "";
    }

    get binPath () {
        return PATH.join(this.baseDir, this.relBinPath);
    }
    get idPath () {
        return PATH.join(this.baseDir, this.relIdPath);
    }
    get packagesPath () {
        return PATH.join(this.baseDir, this.relPackagesPath);
    }

    get id () { 
        if (FS.existsSync(this.idPath)) {
            // Use existing ID if specified
            return FS.readFileSync(this.idPath, "utf8").replace(/\s*\n\s*/, ""); 
        }
        // Derive default ID
        return PATH.basename(this.baseDir);
    }

    get PATH () {
        return `${this.binPath}:${process.env.PATH}`
    }
    get NODE_PATH () {
        if (process.env.NODE_PATH) {
            return `${this.packagesPath}:${process.env.NODE_PATH}`;
        }
        return this.packagesPath;
    }
}

class Toolchain extends Workspace {

    constructor (baseDir) {
        super(baseDir);
        let self = this;

        self.relIdPath = ".toolchain.id";
    }
}

exports.Workspace = Workspace;
exports.Toolchain = Toolchain;
