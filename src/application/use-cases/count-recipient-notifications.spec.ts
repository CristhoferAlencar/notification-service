import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";
import { makeNotification } from "@test/factories/notification-factory";

describe("Count recipient notifications", () => {
  it("should be able to count recipient notifications", async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: "recpient-1",
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: "recpient-1",
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: "recpient-2",
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: "recpient-1",
    });

    expect(count).toEqual(2);
  });
});
