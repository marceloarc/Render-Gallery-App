import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  console.log('Existing status:', existingStatus); // Verificar status de permissões existente

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    console.log('Requested permissions status:', status); // Verificar status de permissões solicitado
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Permission not granted.'); // Log se permissões não foram concedidas
    alert('Failed to get push token for push notification!');
    return;
  }

  const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
  if (!projectId) {
    console.error('Project ID not found');
    alert('Project ID not found');
    return;
  }

  try {
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    console.log('Push token:', token); // Log do token recebido com sucesso
  } catch (error) {
    console.error('Error getting push token:', error); // Log de erro caso ocorra problema na obtenção do token
  }

  return token;
}

export async function sendPushNotification(expoPushToken, body, title) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: { someData: 'goes here' },
  };
console.log('Enviando notificação:', message);
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      host: "exp.host",
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

}

export async function scheduleNotification(content, trigger) {
  console.log('Agendando notificação:', trigger.token);
  // try {
    const body = content.body || 'Você recebeu uma nova mensagem.';
    const title = content.title || 'Nova notificação';
    const token = trigger.token;
    const testeenvio = await sendPushNotification(token, body, title);
  //   const notificationId = await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: content.title || 'Nova notificação',
  //       body: content.body || 'Você recebeu uma nova mensagem.',
  //       sound: 'default',
  //       color: '#00406A',
  //       icon: './assets/System/logo.png',
  //       data: { withSome: 'data' },
  //       android: {
  //         channelId: 'default',
  //         sticky: true,
  //         autoCancel: false,
  //       },
  //     },
  //     trigger: null,
  //   });
  //   console.log('Notificação agendada com sucesso. ID:', notificationId);
  // } catch (error) {
  //   console.error('Erro ao agendar notificação:', error);
  // }
}
