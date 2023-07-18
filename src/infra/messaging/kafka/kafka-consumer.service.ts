import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: "notifications",
        brokers: ["relaxed-lioness-5472-us1-kafka.upstash.io:9092"],
        sasl: {
          mechanism: "scram-sha-256",
          username:
            "cmVsYXhlZC1saW9uZXNzLTU0NzIkx-u9KcBhKrF20csPSctWzskJcUJkRkGIra4",
          password: "70d27b76f96f402aa74e7fae350ea4bc",
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
