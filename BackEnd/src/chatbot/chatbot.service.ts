import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

@Injectable()
export class ChatbotService {
  private model: GenerativeModel;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('Missing GEMINI_API_KEY in environment variables');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async getChatResponse(message: string): Promise<string> {
    try {
      const lowerMsg = message.toLowerCase();

      // --- 1️⃣ Deteksi sapaan ---
      if (/(^|\s)(halo|hai|hello|hi|hei|hey)(\s|!|$)/i.test(lowerMsg)) {
        return 'Halo! Senang berjumpa denganmu. Saya adalah AI Salbot atau Faishalbot, yang siap membantu kamu dengan jawaban dan informasi apa pun. Jika ada yang bisa saya bantu, silakan beritahu saja! Apakah ada topik yang ingin kamu bahas sekarang? 😊';
      }

      // --- 2️⃣ Deteksi kata kasar ---
      const badWords = [
        'anjing',
        'goblok',
        'tolol',
        'bangsat',
        'kontol',
        'babi',
        'kampret',
        'idiot',
        'asu',
      ];
      if (badWords.some((word) => lowerMsg.includes(word))) {
        return 'Permintaan Anda tidak jelas. Bisakah Anda jelaskan lebih rinci apa yang Anda cari? Saya akan berusaha membantu Anda. Jika Anda mencari informasi tentang Faishal Rasyid Rusianto atau topik lain, silakan berikan detailnya!';
      }

      // --- 3️⃣ Mode normal (jawaban relevan dengan portofolio) ---
      const systemPrompt = `
Kamu adalah "Salbot" (atau "Faishalbot"), asisten AI pribadi milik Faishal Rasyid Rusianto.
Tugasmu adalah menjawab pertanyaan tentang Faishal, keahlian, dan proyek portofolionya.

Faishal Rasyid Rusianto berasal dari Jawa Tengah, dia seorang mahasiswa Universitas Dian Nuswantoro,
dan saat ini sedang meningkatkan skill-nya dalam bidang teknologi.

Portofolio ini dibuat dengan menggunakan framework Next.js, TailwindCSS, and TypeScript.

Keahlian saya adalah Software Engineer, dan saya bisa membantu Anda dengan jawaban yang relevan dan menarik.

Jawablah dengan sopan, hangat, dan profesional.
Jika user bertanya di luar topik Faishal atau portofolionya, arahkan percakapan kembali ke topik itu.


`;

      // ✅ Format baru untuk Gemini 2.0
      const result = await this.model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${systemPrompt}\n\nUser: ${message}`,
              },
            ],
          },
        ],
      });

      const text: string = result.response.text();
      return text || 'Maaf, saya belum punya informasi tentang itu.';
    } catch (error) {
      console.error('Gemini error:', error);
      throw new HttpException(
        'Error connecting to Gemini API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
