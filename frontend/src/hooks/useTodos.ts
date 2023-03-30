import { useCallback, useEffect, useState } from "react";
import { Filter, Todo } from "../types";
import { stringifyQs } from "../utils";
import { DEFAULT_PAGE, TODOS_URL } from "../utils/constants";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [totalTodos, setTotalTodos] = useState(0);
  const [filters, setFilters] = useState<Filter>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${TODOS_URL}?${stringifyQs(filters)}`);
        const { count, todos } = await response.json();
        setTodos(todos);
        setTotalTodos(count);
        setPage(DEFAULT_PAGE);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [filters.description, filters.priority]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : e.target.value;
    setFilters({ ...filters, [e.target.name]: value });
  };

  const fetchMore = useCallback(async () => {
    if (todos.length >= totalTodos - 1) return;
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const response = await fetch(
        `${TODOS_URL}?${stringifyQs(filters)}&page=${nextPage}`
      );
      const { todos: nextPageTodos } = await response.json();
      setTodos([...todos, ...nextPageTodos]);
      setPage(nextPage);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }, [page, totalTodos, todos.length]);

  return { handleFilterChange, fetchMore, todos, filters, isLoading };
};
