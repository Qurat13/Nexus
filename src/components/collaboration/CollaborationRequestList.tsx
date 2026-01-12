import React, { useState } from 'react';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { useAuth } from '../../context/AuthContext';
import { CollaborationRequestCard } from './CollaborationRequestCard';
import { Card, CardHeader, CardBody } from '../ui/Card';

export const CollaborationRequestsList: React.FC = () => {
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(false);

  if (!user || user.role !== 'entrepreneur') return null;

  const requests = getRequestsForEntrepreneur(user.id);

  const handleStatusUpdate = (requestId: string, status: 'accepted' | 'rejected') => {
    // force re-render after status change
    setRefresh(!refresh);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Collaboration Requests</h3>
      </CardHeader>
      <CardBody>
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((req) => (
              <CollaborationRequestCard
                key={req.id}
                request={req}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No collaboration requests yet.</p>
        )}
      </CardBody>
    </Card>
  );
};