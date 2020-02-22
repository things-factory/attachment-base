import uuid from 'uuid/v4'
import AWS from 'aws-sdk'
import { logger } from '@things-factory/env'
const { PassThrough } = require('stream')
const mime = require('mime')
const { fs } = require('memfs')

import { STORAGE } from './attachment-const'

if (STORAGE && STORAGE.type == 's3') {
  const S3 = new AWS.S3({
    accessKeyId: STORAGE.accessKeyId,
    secretAccessKey: STORAGE.secretAccessKey
  })

  /* upload file */
  STORAGE.uploadFile = ({ stream, filename }) => {
    const id = uuid()
    const ext = filename.split('.').pop()
    const key = ext ? `${id}.${ext}` : id
    var size: number = 0

    return new Promise<{ id: string; path: string; size: number }>((resolve, reject) =>
      stream
        .pipe(
          (() => {
            var pass = new PassThrough()

            S3.upload(
              {
                Bucket: STORAGE.bucketName,
                Key: key,
                Body: pass
              },
              (err, data) => (err ? reject(err) : resolve({ id, path: key, size }))
            )
            // Response data from S3
            // {
            //   ETag:"b2b068edcc5517a75e1119c785e1cf87",
            //   Location:"https://opa-one.s3.amazonaws.com/873af101-4e92-4164-b738-062af5b2413b.png",
            //   key:"873af101-4e92-4164-b738-062af5b2413b.png",
            //   Key:"873af101-4e92-4164-b738-062af5b2413b.png",
            //   Bucket:"opa-one"
            // }
            return pass
          })()
        )
        .on('error', error => reject(error))
        .on('data', chunk => (size += chunk.length))
    )
  }

  STORAGE.deleteFile = path => {
    return new Promise((resolve, reject) =>
      S3.deleteObject(
        {
          Bucket: STORAGE.bucketName,
          Key: path
        },
        (err, data) => (err ? reject(err) : resolve(data))
      )
    )
  }

  /* creating bucket */
  // s3.createBucket(
  //   {
  //     Bucket: STORAGE.bucketName,
  //     CreateBucketConfiguration: {
  //       // Set your region here
  //       LocationConstraint: 'eu-west-1'
  //     }
  //   },
  //   function(err, data) {
  //     if (err) console.log(err, err.stack)
  //     else console.log('Bucket Created Successfully', data.Location)
  //   }
  // )

  /* TODO Streaming to Streaming 으로 구현하라. */
  STORAGE.sendFile = async (context, attachment, next) => {
    const result = await S3.getObject({
      Bucket: STORAGE.bucketName,
      Key: attachment
    }).promise()

    fs.writeFileSync(`/${attachment}`, result.Body)

    context.set({
      'Content-Length': result.ContentLength,
      'Content-Type': mime.getType(attachment),
      'Last-Modified': result.LastModified,
      ETag: result.ETag,
      'Cache-Control': 'public, max-age=31556926'
    })

    context.body = await fs.createReadStream(`/${attachment}`)
  }

  STORAGE.readFile = async attachment => {
    const result = await S3.getObject({
      Bucket: STORAGE.bucketName,
      Key: attachment
    }).promise()

    return result.Body.toString('utf-8')
  }

  logger.info('S3 Bucket Storage is Ready.')
}
