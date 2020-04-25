#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const { exec } = require("child_process");


const [,,...args] = process.argv;
const user = os.userInfo().username;
const baseDirectory = `/home/${user}/notes`;

const makeNotesDirectory = () => {
    fs.mkdir(baseDirectory,(err) => {
        if(err) { 
            console.error('something went wrong',err);
            if(err = 'EEXIST') return;
        }
        genarateFileName();
    })
}


const genarateFileName = (fileName, ext ='') => {
    return new Promise((resolve, reject) => {
        if(fileName) {
            resolve(`${fileName}${ext ? `.${ext}`:''}`);
        } 
        fs.readdir(baseDirectory,(err,items) => {
            if(err === 'ENOENT') {
                makeNotesDirectory();
            } else {
                let maxSeqNo = 0; 
                items.forEach(fileName => {
                    if(fileName.includes('note')) {
                        const seqNo = Number(fileName. match(/\d+$/)[0]);
                        if(!isNaN(seqNo) && seqNo > maxSeqNo) maxSeqNo = seqNo;
                    }
                });
    
                resolve(`note${maxSeqNo + 1}${ext ? `.${ext}`:''}`);
            }
        });
    });
    
}
//create a file using this name or create a name of file automatically
genarateFileName(args[0],args[1]).then((fileName) => exec(`cd ${baseDirectory} && subl ${fileName}`));