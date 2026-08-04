/** @vitest-environment jsdom */
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  location.hash = '';
  window.scrollTo = vi.fn();
});

afterEach(cleanup);

describe('mobile decision flow', () => {
  it('walks from welcome through inherited non-spicy choices to a concrete dish', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /开始选吃的/ }));
    expect(await screen.findByText('今晚想吃多饱？')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /正常吃饭/ }));
    await screen.findByText('想吃什么温度？');
    await user.click(screen.getByRole('button', { name: /热的/ }));
    await screen.findByText('能接受多重口味？');
    await user.click(screen.getByRole('button', { name: /🙂正常/ }));
    await screen.findByText('今天能接受辣吗？');
    await user.click(screen.getByRole('button', { name: /完全不辣/ }));
    await screen.findByText('更偏向哪一种形式？');
    await user.click(screen.getByRole('button', { name: /米饭/ }));

    expect(await screen.findByText('今晚想要哪种味道？')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: /鲜香/ }));
    expect(await screen.findByText('接下来，选一个菜系')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: /粤菜/ }));
    expect(await screen.findByText('今晚具体吃什么？')).toBeTruthy();

    const dishButton = screen.getAllByRole('button').find((button) => button.classList.contains('dish-card'));
    expect(dishButton).toBeTruthy();
    await user.click(dishButton!);

    expect(await screen.findByText('今晚就吃')).toBeTruthy();
    expect(screen.getByRole('button', { name: /就吃这个/ })).toBeTruthy();
  });

  it('opens a real wheel when any is selected', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /开始选吃的/ }));
    await screen.findByText('今晚想吃多饱？');
    await user.click(screen.getByRole('button', { name: /随便/ }));
    expect(await screen.findByText('把这一票交给命运')).toBeTruthy();
    expect(screen.getByRole('button', { name: '转动命运' })).toBeTruthy();
  });
});
