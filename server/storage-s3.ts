import uuid from 'uuid/v4'
import AWS from 'aws-sdk'
import { STORAGE } from './attachment-const'

const { PassThrough } = require('stream')

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
              (err, data) => (err ? reject(err) : resolve({ id, path: data.Location, size }))
            )
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
        { Bucket: STORAGE.bucketName, Key: path.split('/').pop() /* path에서 key를 추출해야한다. */ },
        (err, data) => (err ? reject(err) : resolve(data))
      )
    )
  }

  // STORAGE.downloadFile =

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

  console.log(
    '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&\n',
    STORAGE.type,
    STORAGE.uploadFile,
    STORAGE.deleteFile
  )
}
