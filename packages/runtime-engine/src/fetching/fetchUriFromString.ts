import axios, { AxiosResponse } from 'axios';

export async function fetchUriFromString(
  resource: string | object
): Promise<AxiosResponse<any, any> | void> {
  if (typeof resource === 'string') {
    const protocol = resource.split(':')[0];
    switch (protocol) {
      case 'http':
      case 'https':
        return axios.get(resource);
      case 'ipfs':
        const hash = resource.split('://')[1];
        const { data, status } = await axios.get(
          `https://gateway.pinata.cloud/ipfs/${hash}`
        );
        if (status === 200) {
          return data;
        } else {
          throw new Error(`Could not fetch resource from ${resource}`);
        }
      default:
        throw new Error(`Unsupported protocol: ${protocol}`);
    }
  } else {
    throw new Error('Invalid resource type');
  }
}

export default fetchUriFromString;
