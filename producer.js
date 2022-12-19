import { Kafka } from "kafkajs";
import { randomUUID } from "node:crypto";

async function bootstrap() {
  const kafka = new Kafka({
    clientId: "notifications",
    brokers: ["smiling-crawdad-7156-us1-kafka.upstash.io:9092"],
    sasl: {
      mechanism: "scram-sha-256",
      username:
        "c21pbGluZy1jcmF3ZGFkLTcxNTYkFgXuVjabeEK_ZpXDyc36MhFfOZ_ejpwNCog",
      password:
        "GLVAKWwJNuKiQHnLsj0d_unhbiDK-b_2xn666syaLIJtX8p7ga_JylYPPDKWYvzKtquDOQ==",
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "notifications.send-notification",
    messages: [
      {
        value: JSON.stringify({
          content: "Outra solicitação de amizade!",
          category: "Social",
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
