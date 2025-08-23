// utils/debugToken.ts - Crie este arquivo
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TokenTest {
  step: string;
  success: boolean;
  data?: any;
  error?: string;
}

export const debugAuthComplete = async (): Promise<TokenTest[]> => {
  const results: TokenTest[] = [];
  
  try {
    console.log('🧪 === INICIANDO DEBUG COMPLETO DE AUTENTICAÇÃO ===');

    // Passo 1: Verificar AsyncStorage
    console.log('📋 Passo 1: Verificando AsyncStorage...');
    try {
      const [token, refreshToken, userData] = await AsyncStorage.multiGet([
        '@AuthToken',
        '@RefreshToken',
        '@UserData'
      ]);

      results.push({
        step: '1. Storage Check',
        success: true,
        data: {
          hasToken: !!token[1],
          hasRefreshToken: !!refreshToken[1],
          hasUserData: !!userData[1],
          tokenPreview: token[1] ? token[1].substring(0, 50) + '...' : null,
          tokenLength: token[1] ? token[1].length : 0
        }
      });

      if (!token[1]) {
        results.push({
          step: '2. Token Availability',
          success: false,
          error: 'Token não encontrado no AsyncStorage com chave @AuthToken'
        });

        // Tentar listar todas as chaves para debug
        try {
          const allKeys = await AsyncStorage.getAllKeys();
          console.log('🔍 Todas as chaves no AsyncStorage:', allKeys);
          results.push({
            step: '2.1 All Storage Keys',
            success: true,
            data: { allKeys }
          });
        } catch (e) {
          console.log('❌ Erro ao listar chaves:', e);
        }

        return results;
      }

      // Passo 2: Decodificar token JWT
      console.log('📋 Passo 2: Decodificando token JWT...');
      try {
        const parts = token[1].split('.');
        if (parts.length !== 3) {
          throw new Error('Token não tem formato JWT válido (deve ter 3 partes separadas por ponto)');
        }

        const payload = JSON.parse(atob(parts[1]));
        const now = Math.floor(Date.now() / 1000);
        
        results.push({
          step: '2. Token Decode',
          success: true,
          data: {
            tokenParts: parts.length,
            userId: payload.userId,
            email: payload.email,
            issuedAt: new Date(payload.iat * 1000).toISOString(),
            expiresAt: new Date(payload.exp * 1000).toISOString(),
            isExpired: payload.exp < now,
            timeToExpiry: payload.exp - now,
            currentTime: new Date().toISOString()
          }
        });

        if (payload.exp < now) {
          console.log('⚠️ TOKEN EXPIRADO!');
        }

      } catch (error) {
        results.push({
          step: '2. Token Decode',
          success: false,
          error: error instanceof Error ? error.message : 'Erro ao decodificar token'
        });
      }

      // Passo 3: Teste de requisição básica
      console.log('📋 Passo 3: Teste de requisição básica...');
      try {
        const testUrl = 'http://192.168.3.7:3333/api/inventory/pieces';
        
        const response = await fetch(testUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token[1]}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('📊 Status da resposta:', response.status);

        const responseText = await response.text();
        let responseData;
        
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = { rawResponse: responseText };
        }

        results.push({
          step: '3. Basic Request Test',
          success: response.ok,
          data: {
            url: testUrl,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            response: responseData
          },
          error: !response.ok ? `HTTP ${response.status}: ${responseText}` : undefined
        });

        // Passo 4: Teste específico de criação de peça (se request básica passou)
        if (response.ok) {
          console.log('📋 Passo 4: Teste de criação de peça...');
          try {
            const createUrl = 'http://192.168.3.7:3333/api/inventory/pieces';
            const testPieceData = {
              categoryPath: ['Debug', 'Teste'],
              description: `Peça de debug - ${new Date().toISOString()}`,
              quantity: 1
            };

            const createResponse = await fetch(createUrl, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token[1]}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(testPieceData)
            });

            const createResponseText = await createResponse.text();
            let createResponseData;
            
            try {
              createResponseData = JSON.parse(createResponseText);
            } catch {
              createResponseData = { rawResponse: createResponseText };
            }

            results.push({
              step: '4. Create Piece Test',
              success: createResponse.ok,
              data: {
                url: createUrl,
                requestData: testPieceData,
                status: createResponse.status,
                statusText: createResponse.statusText,
                response: createResponseData
              },
              error: !createResponse.ok ? `HTTP ${createResponse.status}: ${createResponseText}` : undefined
            });

          } catch (error) {
            results.push({
              step: '4. Create Piece Test',
              success: false,
              error: error instanceof Error ? error.message : 'Erro de rede na criação de peça'
            });
          }
        }

      } catch (error) {
        results.push({
          step: '3. Basic Request Test',
          success: false,
          error: error instanceof Error ? error.message : 'Erro de rede na requisição básica'
        });
      }

    } catch (error) {
      results.push({
        step: '1. Storage Check',
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao acessar AsyncStorage'
      });
    }

  } catch (error) {
    results.push({
      step: 'General Error',
      success: false,
      error: error instanceof Error ? error.message : 'Erro geral no debug'
    });
  }

  // Imprimir resultado final organizado
  console.log('🧪 === RESULTADO DO DEBUG COMPLETO ===');
  results.forEach((result, index) => {
    const status = result.success ? '✅ PASSOU' : '❌ FALHOU';
    console.log(`${index + 1}. ${result.step}: ${status}`);
    
    if (result.error) {
      console.log(`   ❌ Erro: ${result.error}`);
    }
    
    if (result.data) {
      console.log(`   📊 Dados:`, result.data);
    }
    console.log(''); // Linha em branco para separar
  });
  
  const passedTests = results.filter(r => r.success).length;
  const totalTests = results.length;
  console.log(`🏆 RESULTADO FINAL: ${passedTests}/${totalTests} testes passaram`);
  
  if (passedTests === totalTests) {
    console.log('🎉 TODOS OS TESTES PASSARAM! O token está funcionando corretamente.');
  } else {
    console.log('⚠️ ALGUNS TESTES FALHARAM. Verifique os erros acima.');
  }
  
  console.log('🧪 === FIM DO DEBUG COMPLETO ===');

  return results;
};

// Função rápida para verificar se o token existe
export const quickTokenCheck = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('@AuthToken');
    console.log('⚡ Quick check - Token:', token ? 'EXISTE' : 'NÃO EXISTE');
    
    if (token) {
      // Verificar se não está expirado
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp < Math.floor(Date.now() / 1000);
        console.log('⚡ Quick check - Token expirado:', isExpired ? 'SIM' : 'NÃO');
        return !isExpired;
      } catch {
        console.log('⚡ Quick check - Erro ao decodificar token');
        return false;
      }
    }
    
    return false;
  } catch {
    return false;
  }
};

// Função para limpar todos os tokens (útil para reset)
export const clearAllTokens = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(['@AuthToken', '@RefreshToken', '@UserData']);
    console.log('🧹 Todos os tokens foram limpos do storage');
  } catch (error) {
    console.error('❌ Erro ao limpar tokens:', error);
  }
};