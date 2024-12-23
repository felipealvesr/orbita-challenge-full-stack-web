import { watch } from 'vue';
import { eventEmitter } from '@/main';
import { useSubscription } from '@vue/apollo-composable';
import { ON_UPDATED_STUDENT, ON_LISTED_STUDENT, ON_INSERTED_STUDENT } from '@/graphql/subscriptions/student.subscription';

export default function watchSubscriptions() {
  const onListedStudentResult = useSubscription(ON_LISTED_STUDENT).result;
  const onInsertedStudentResult = useSubscription(ON_INSERTED_STUDENT).result;
  const onUpdatedStudentResult = useSubscription(ON_UPDATED_STUDENT).result;

  watch(onListedStudentResult, () => {
    if (onListedStudentResult.value) {
      eventEmitter.emit('onListedStudent', onListedStudentResult.value);
    }
  });

  watch(onInsertedStudentResult, () => {
    if (onInsertedStudentResult.value) {
      eventEmitter.emit('onInsertedStudent', onInsertedStudentResult.value);
    }
  });

  watch(onUpdatedStudentResult, () => {
    if (onUpdatedStudentResult.value) {
      eventEmitter.emit('onUpdatedStudent', onUpdatedStudentResult.value);
    }
  });
}
