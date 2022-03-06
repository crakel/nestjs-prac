import { BoardStatus } from '../board-status-enum';
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class BoardStatusValidationPipe implements PipeTransform {
  // readonly calss property => 속성을 읽기 전용으로
  // 클래스 외부에서 액세스 할 수 있지만 값 변경 X
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  transform(value: any) {
    console.log('value', value);

    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }
    return value;
  }
  private isStatusValid(status: any) {
    // indexOf는 없는 index면 -1 return
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
