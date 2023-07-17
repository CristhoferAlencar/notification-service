import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/content";
import { CountRecipientNotifications } from "./count-recipient-notifications";

describe("Count recipient notifications", () => {
  it("should be able to count recipient notifications", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: "social",
        content: new Content("Nova solicitação de amizade!"),
        recipientId: "recpient-1",
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: "social",
        content: new Content("Nova solicitação de amizade!"),
        recipientId: "recpient-1",
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: "social",
        content: new Content("Nova solicitação de amizade!"),
        recipientId: "recpient-2",
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: "recpient-1",
    });

    expect(count).toEqual(2);
  });
});
