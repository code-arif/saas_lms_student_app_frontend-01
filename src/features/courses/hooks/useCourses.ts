import { useQuery, useMutation } from '@tanstack/react-query';
import { courseService } from '../services/courseService';
import { CourseFilters } from '../types/course.types';

export const useCourses = (filters?: CourseFilters) => {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: () => courseService.getCourses(filters),
  });
};

export const useCourse = (uuid: string) => {
  return useQuery({
    queryKey: ['course', uuid],
    queryFn: () => courseService.getCourse(uuid),
    enabled: !!uuid,
  });
};

export const useMyCourses = () => {
  return useQuery({
    queryKey: ['my-courses'],
    queryFn: () => courseService.getMyCourses(),
  });
};

export const useEnroll = () => {
  return useMutation({
    mutationFn: (uuid: string) => courseService.enroll(uuid),
  });
};
