import azure from "azure-storage";
import config from "../config";
import streamifier from "streamifier";
import memmorystreams from "memory-streams";

//const container = "localcontent";
/*
 const container = (draft) => {
   return (draft || config.env === 'dev') ? 'devcontent' : 'content';
 };
*/

const container = (draft) => {
  if (config.env === "dev") {
    return "localcontent";
  }
  return draft ? "devcontent" : "content";
};

const retryOperations = new azure.ExponentialRetryPolicyFilter(
  10,
  5000,
  3000,
  30000
);

export let blobService = azure
  .createBlobService("sdacms", config.blobStorage.key)
  .withFilter(retryOperations);

export const contentURL = (path, draft) =>{
  encodeURI(`/${container(draft)}/${path}`);
}

export const createBlockBlobFromText = (draft) => (blob, text) =>
  new Promise((resolve, reject) => {
    blobService.createBlockBlobFromText(
      container(draft),
      blob,
      text,
      { contentSettings: { contentType: "application/json" } },
      (err, res, response) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  });

export const createBlockBlobFromBuffer =
  (draft) => (blob, buffer, contentType) => {
    return new Promise((resolve, reject) => {
      blobService.createBlockBlobFromStream(
        container(draft),
        blob,
        streamifier.createReadStream(buffer),
        buffer.length,
        { contentSettings: { contentType: contentType } },
        (err, res, response) => {
          if (err) reject(err);
          else {
            resolve(res);
          }
        }
      );
    });
  };

export const getBlockBlobToBuffer = (blob) =>
  new Promise((resolve, reject) => {
    let writeable = new memmorystreams.WritableStream();
    try {
      const stream = blobService.createReadStream(
        container(false),
        blob,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(writeable.toBuffer());
          }
        }
      );
      stream.on("error", (err) => err);
      stream.pipe(writeable);
    } catch (err) {
      console.log("catch ", err);
    }
  });

// TODO Support continuation token
export const listBlobsSegmentedWithPrefix = (prefix, nextToken = null) =>
  new Promise((resolve, reject) => {
    blobService.listBlobsSegmentedWithPrefix(
      container(),
      prefix,
      nextToken,
      (err, res, response) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  });
