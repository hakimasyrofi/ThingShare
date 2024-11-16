import lighthouse from "@lighthouse-web3/sdk";

/**
 * This function allows you to upload a file or a folder to Lighthouse.
 *
 * @param {string} path - The location of your file or folder.
 * @param {string} apiKey - Your personal API key for Lighthouse.
 * @param {object} dealParameters - Custom parameters for file storage deals(check FVM section).
 * @return {object} - Returns details about the uploaded file.
 */
const lighthouseApiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY || "";

export async function uploadToLighthouse(file: File) {
  try {
    const uploadResponse = await lighthouse.upload([file], lighthouseApiKey);
    console.log(uploadResponse);
    return uploadResponse;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

/*Sample response
{
  data: {
    Name: 'wow.jpg',
    Hash: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
    Size: '31735'
  }
}
*/
