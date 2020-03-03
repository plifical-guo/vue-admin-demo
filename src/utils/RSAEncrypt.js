import JsEncrypt from 'jsencrypt'

const publicKey = '-----BEGIN PUBLIC KEY-----' +
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCoq0jRu2kq/RHYD7myzKoNSbL26AGttRwb1OiesnLVnoIJb2I3Tb4j7KiIqnwizki3LEayX1Lt3tqk9cEne/VrUnHydFRudeQZdEgHUv2zLvxZDyUdJfYWuHph3fSZcSwqhU9OJ79OS66JCl2bPQ5yr+ZwVoLDRmwDmptNq1yXwIDAQAB' +
'-----END PUBLIC KEY-----'
// 加密方法
export default function RSAencrypt(pas) {
  // 设置公钥
  const rsa = new JsEncrypt()
  rsa.setPublicKey(publicKey)
  return rsa.encrypt(pas)
}
