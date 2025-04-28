import { IHashProvider } from "../../../../../../src/shared/providers/hashProvider/models/IHashPovider";
import { compare, hash } from "bcryptjs";

class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
export default FakeHashProvider;
